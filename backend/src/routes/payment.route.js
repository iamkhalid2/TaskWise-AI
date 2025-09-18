import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { createOrder, verification } from '../controllers/pay.controller.js'
import { getPurchaseHistory } from '../controllers/paymentHistory.controller.js'

const router = express.Router()

router.use(protectedRoute)

router.post('/buycredits',createOrder)
router.post('/verify-payment',verification)
router.get('/payment-history',getPurchaseHistory)




export default router