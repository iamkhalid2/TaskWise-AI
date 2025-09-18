import express from 'express'
import { protectedRoute } from '../middlewares/auth.middleware.js'
import { deleteUser, updateProfile } from '../controllers/user.controller.js'

const router = express.Router()

//protected
router.use(protectedRoute)

router.put('/update-user',updateProfile)
router.delete('/delect-user',deleteUser)


export default router