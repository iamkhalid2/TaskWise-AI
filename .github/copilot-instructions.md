## Architecture Snapshot
- Monorepo with `backend` (Express + MongoDB) and `frontend` (Vite + React 19 + Tailwind/daisyUI); backend exposes `/api/*` that the React SPA consumes via `axios` with credentials enabled.
- Auth is cookie-based JWT (`backend/src/lib/generateToken.js`, `middlewares/auth.middleware.js`) so every protected route assumes `cookie-parser` has populated `req.cookies.jwt`.
- AI responses flow through `POST /api/ai/query`, chaining `protectedRoute` → `rateLimiter` (Upstash fixed window 3/min) → `creditUsage` (decrement user credits) → `controllers/ai.controller.js` which persists the prompt/response on the user document.
- Payments issue Razorpay orders (`controllers/pay.controller.js`) and on verification persist to `models/Payment.js` and re-credit the user, which keeps history consistent for later auditing via `/api/payment/payment-history`.

## Backend Patterns
- Entry point `src/server.js` wires routes; when adding routes ensure they live under `/api` and mount before `app.listen`.
- Database access always uses Mongoose models; `User` embeds chat history documents so modifications must use `$push`/`$pull` to avoid overwriting other entries (`controllers/history.controller.js`).
- `smartModelSelector` (`services/selectmodel.js`) first classifies the prompt via OpenRouter GPT-4o mini, then dispatches to OpenRouter or Nebius image API—preserve this orchestration and propagate errors so the credit refund block in `ai.controller.js` can run.
- Rate limiting relies on Upstash (`lib/upstash.js`); reuse the singleton `ratelimit` export rather than re-instantiating to avoid multiple Redis connections.
- Controllers expect `req.user` injected by `protectedRoute`; when writing new controllers, avoid destructuring `_id` into new variable names (bugs exist in `user.controller.js`); use `const userId = req.user._id`.

## Frontend Patterns
- React Router v7 is imported from `react-router`; routing lives inside `App.jsx` and authenticated screens wrap children with `components/Layout` that shows `Navbar`/`Sidebar`.
- Data fetching/mutations run through TanStack Query hooks (`hooks/UseAuthUser.jsx`, `UseLoginUser.jsx`, `UseSignup.jsx`) that invalidate `"authUser"` or related keys; follow this pattern for new API calls so auth state refreshes automatically.
- HTTP layer uses `libs/axios.js` to target `http://localhost:3001/api` during dev with `withCredentials: true`; new endpoints should be added to `libs/api.js` so hooks can stay thin.
- Styling assumes Tailwind + daisyUI (`tailwind.config.js`); shared layout pieces live under `components/` and currently expect full-height flex wrappers when rendering new pages.

## Workflows & Environments
- Install dependencies separately: `cd backend && npm install`, `cd frontend && npm install`.
- Backend script `npm run dev` points at `nodemon server.js`; either update it or run `npx nodemon src/server.js` from `backend` to boot Express on port 3001 (CORS allows `http://localhost:5173`).
- Frontend starts with `npm run dev` from `frontend` (Vite port 5173); use `npm run preview` only after `npm run build` succeeds.
- Required env vars (see root `README.md`): `MONGODB_URI`, `JWT_SECRET_KEY`, `HF_API_KEY`, `OPEN_API_KEY`, `NEBIUS_API_KEY`, `RAZERPAY_API_KEY`, `RAZERPAY_SECRET_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.

## Gotchas & Tips
- Credits decrement before the AI call; always set `req.creditReserved = true` if you reserve credits so the refund logic can run on failure.
- Razorpay receipts concatenate user id and timestamp; preserve that shape when adjusting payment flows so verification hashes remain stable.
- When extending chat history, remember `frontend` expects `get-responses` to return an array of history entries identical to the schema in `models/User.js`.
- Express 5 is in use; route handlers can be async without manual `next(err)` but be mindful of its stricter router matching.
- Tailwind classes expect `index.css` to import Tailwind base/components/utilities; keep new global styles inside that pipeline rather than standalone CSS files.
