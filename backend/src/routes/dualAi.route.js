import express from 'express';
import { getDualResponse } from '../controllers/dualAi.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { creditUsage } from '../middlewares/checkCredit.middleware.js';
import rateLimit from '../middlewares/rateLimiter.js';

const router = express.Router();

// Dual AI endpoint - same middleware chain as single AI
router.post('/dual-query', protectedRoute, rateLimit, creditUsage, getDualResponse);

export default router;
