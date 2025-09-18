import express from 'express'
import { getResponse } from '../controllers/ai.controller.js'
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { creditUsage } from '../middlewares/checkCredit.middleware.js'
import rateLimit from '../middlewares/rateLimiter.js'


const router = express.Router()

//check for auth user 
//if user has limit to 
//does it he has enough credit to make request

router.post('/query',protectedRoute,rateLimit,creditUsage,getResponse)


export default router