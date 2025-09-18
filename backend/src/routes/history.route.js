import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { deleteAllHistory, deleteResponse, getResponse, getResponses } from '../controllers/history.controller.js'


const router = express.Router()

router.use(protectedRoute)

router.get('/get-response/:id',getResponse)
router.get('/get-responses',getResponses)

router.delete('/delete-response/:id',deleteResponse)
router.delete('/delete-all-responses',deleteAllHistory)

export default router