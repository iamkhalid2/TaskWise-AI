# TaskWise-AI Copilot Instructions

## Project Overview
TaskWise-AI is a credit-based AI platform with **dual model comparison**. The system sends each user prompt to two different AI models simultaneously (GPT-4o-mini and Claude 3.5 Sonnet) and displays their responses side-by-side in a ChatGPT-style interface. Users authenticate via JWT, purchase credits through Razorpay, and are rate-limited via Upstash Redis.

**Tech Stack**: MERN (MongoDB, Express, React, Node.js) with TanStack Query, DaisyUI/Tailwind, Vite, Lucide Icons

## Architecture & Data Flow

### Dual AI Request Pipeline (Primary Feature)
The main chat interface uses dual AI endpoints in `backend/src/routes/dualAi.route.js`:
```javascript
router.post('/dual-query', protectedRoute, rateLimit, creditUsage, getDualResponse)
```

**Flow**:
1. **protectedRoute** - Validates JWT from cookies, attaches `req.user`
2. **rateLimit** - Enforces 3 requests per 60s via Upstash Redis (per user ID)
3. **creditUsage** - Pre-deducts 1 credit using atomic MongoDB operation (`$inc: -1`)
4. **getDualResponse** - Calls both AI models in parallel → returns both responses

**Dual Model Service** (`backend/src/services/dualModel.js`):
- Uses `Promise.all()` to call GPT-4o-mini and Claude 3.5 Sonnet simultaneously
- Returns structured object: `{ model1: {...}, model2: {...} }`
- Both responses stored as JSON string in `User.history` array

### Legacy Single Model Selection (Optional)
Original system in `backend/src/services/selectmodel.js` (still available):
- First API call: Uses GPT-4o-mini to classify prompt into task types
- Second API call: Routes to appropriate model (text/code → OpenRouter, images → Nebius AI)

### Authentication Flow
- JWT stored in HTTP-only cookies (not localStorage)
- Frontend checks auth via `/auth/checkauth` on mount using TanStack Query's `queryKey: ["authUser"]`
- Protected routes redirect via React Router based on `isAuthenticated` boolean

### Payment Integration
Razorpay flow in `backend/src/controllers/pay.controller.js`:
1. Client calls `/payment/create-order` → receives `orderId` and credit amount (₹1 = 10 credits)
2. Frontend opens Razorpay modal
3. On success, calls `/payment/verify` with signature
4. Backend validates HMAC SHA256 signature, adds credits atomically, stores Payment record

### Frontend Architecture (ChatGPT-Style Interface)
**Component Structure**:
- `HomePage.jsx` - Main chat interface with auto-scrolling, textarea auto-resize
- `ChatMessage.jsx` - Message wrapper (user/AI distinction)
- `DualOutput.jsx` - Side-by-side AI response panels
- `Navbar.jsx` - Top account panel with credits display, user dropdown
- `Sidebar.jsx` - Left panel with chat history, new chat button

**State Management**:
- Local state for current chat session (`useState` for messages array)
- TanStack Query for server state (auth, history fetching)
- `UseDualAI` hook manages mutation state for sending prompts

**Critical Patterns**:
- Input slides from center → bottom when first message sent
- Textarea auto-expands with content (max-height: 200px)
- Auto-scroll on new messages using `useRef` + `scrollIntoView`
- Empty state shows dual model badges when no chat history

## Developer Workflows

### Running the App
**Backend** (from `backend/` folder):
```bash
npm run dev  # Starts nodemon on port 3001
```

**Frontend** (from `frontend/` folder):
```bash
npm run dev  # Vite dev server on port 5173
```

**CORS Configuration**: Backend hardcoded to allow `http://localhost:5173` with credentials

### Environment Variables Required
```env
# Backend (.env in /backend)
MONGODB_URI=mongodb+srv://...
JWT_SECRET_KEY=your-secret
OPEN_API_KEY=openrouter-key       # Note: Used by openRouter.js
NEBIUS_API_KEY=nebius-key          # For image generation
RAZERPAY_API_KEY=rzp_test_...
RAZERPAY_SECRET_KEY=...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

## Code Conventions & Patterns

### Backend Standards
- **ES Modules**: All files use `import/export` (package.json has `"type": "module"`)
- **Error Handling**: Controllers always return JSON with `{ message: "..." }`. Use `500` for server errors, `401`/`402`/`429` for client errors
- **Password Hashing**: Automated via Mongoose pre-save hook in `User.js` (don't manually hash)
- **Model Updates**: Use atomic operators (`$inc`, `$push`) to avoid race conditions on credits/history

### Frontend Standards
- **API Layer**: All backend calls go through `frontend/src/libs/api.js` (uses axios instance with `withCredentials: true`)
- **State Management**: TanStack Query for server state. Hook naming: `Use[Feature]` (e.g., `UseAuthUser`, `UseDualAI`)
- **Routing**: React Router v7 with conditional redirects based on auth status
- **Styling**: DaisyUI components + Tailwind utilities. Two DaisyUI entries in package.json (dev vs prod) - use the capitalized alias `daisyUI`
- **Icons**: Lucide React (`lucide-react` package) - use semantic names (Send, Sparkles, User, Bot, etc.)
- **Forms**: Controlled components with auto-resize textareas, Enter to submit (Shift+Enter for newline)

### File Naming
- Controllers: `[feature].controller.js`
- Services: `[provider/function].js` (e.g., `openRouter.js`, `selectmodel.js`)
- Routes: `[feature].route.js`
- Frontend hooks: `Use[Feature].jsx` (capital U)
- Frontend pages: `[Name]Page.jsx`

## Key Integration Points

### Adding New AI Models to Dual System
1. Update `getDualModelResponse()` in `backend/src/services/dualModel.js`
2. Add new OpenAI client instance with appropriate baseURL
3. Update `Promise.all()` array with new model configuration
4. Update model names in return object
5. Frontend automatically renders new model names in `DualOutput.jsx`

### Customizing Chat UI
- Message styling in `ChatMessage.jsx` (user messages right-aligned with primary bg)
- Output panels in `DualOutput.jsx` (grid-cols-2 with hover effects)
- Navbar customization in `Navbar.jsx` (credits display, dropdown menu)
- Sidebar chat history in `Sidebar.jsx` (scrollable with recent items limit)

### Middleware Order Matters
Always maintain sequence: `protectedRoute` → `rateLimit` → `creditUsage` → controller
- Auth must come first to populate `req.user`
- Rate limit checks user ID from `req.user._id`
- Credit usage sets `req.creditReserved` flag for rollback

### Frontend Data Fetching
Use TanStack Query with consistent patterns:
- `queryKey`: Descriptive array (e.g., `["authUser"]`, `["chatHistory"]`)
- `queryFn`: Imported from `libs/api.js`
- `retry: false` for auth checks to avoid infinite loops

## Common Gotchas
- **Dual responses**: Backend returns `{ model1: {...}, model2: {...} }` structure. Frontend stores entire object in history array
- **Chat persistence**: Currently chat resets on page reload. History shown in sidebar is from database, not current session
- **Rate limiter**: Fixed window (3 requests/60s) is configured in `lib/upstash.js`, affects both single and dual endpoints
- **Credits**: Default is 10 on signup. Atomic updates prevent double-spend but check `credits: { $gt: 0 }` in query
- **Frontend env**: Use `import.meta.env` not `process.env`. BASE_URL switches on MODE
- **Textarea behavior**: Auto-resize uses ref to set height, maxHeight prevents excessive growth
- **Auto-scroll**: Uses `messagesEndRef` with `scrollIntoView` in useEffect dependent on chatHistory changes
