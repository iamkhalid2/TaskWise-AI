import express from 'express'
import { loginRoute, logoutRoute, signupRoute } from '../controllers/auth.controller.js'
import { protectedRoute } from '../middlewares/auth.middleware.js'


const router = express.Router()

router.post('/signup',signupRoute)
router.post('/login',loginRoute)
router.post('/logout',logoutRoute)

router.get('/checkauth',protectedRoute,(req,res) => {
    res.status(200).json({
        success : "User is authenticated",
        user : req.user 
    })
})

export default router