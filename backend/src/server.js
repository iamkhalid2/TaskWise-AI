import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import aiRoute from './routes/ai.route.js'
import cookieParser from 'cookie-parser'
import historyRoute from './routes/history.route.js'
import paymentRoute from './routes/payment.route.js'
import cors from 'cors'
dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/ai',aiRoute)
app.use('/api/payment',paymentRoute)
app.use('/api/history',historyRoute)


const PORT = process.env.PORT || 3001

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`server started on Port : ${PORT}`);
    })
})

