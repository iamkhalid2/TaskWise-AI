import razorpay from "../services/razorpayment.js"
import crypto from 'crypto'
import dotenv from 'dotenv'
import User from "../models/User.js"
import Payment from "../models/Payment.js"

dotenv.config()


export const createOrder = async (req,res) => {
    try {
        const userId = await req.user._id
        const { amount } = req.body
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt:  `recepit_${userId}_${Date.now}`,
            note : {
                name : userId.username
            }
        }
        const order = await razorpay.orders.create(options);
        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,           
            credits : amount * 10,
        })
    } catch (error) {
        console.log(`Error in pay controller ${error}`);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

export const verification = async (req,res) => {
    try {
        const { razorpay_order_id , razorpay_payment_id, razorpay_signature , credits , currency , amount } = req.body

        const Id = req.user._id

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const secretKey = process.env.RAZERPAY_SECRET_KEY
        const generatedSignature = crypto
            .createHmac('sha256',secretKey)
            .update(sign.toString())
            .digest("hex")
    
        const isValid = razorpay_signature === generatedSignature
        if(isValid) {
            await User.findByIdAndUpdate(
                {_id : Id},
                { $inc : { credits : credits}}
            )   
            res.json({ success: true, message: "Payment verified" });
        }else{
            res.json({ success: false, message: "Payment verification failed" });
        }

        await Payment.create({
            user:Id,
            orderId:razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            amount,
            currency,
            status: "paid",
            creditAdded: credits, 
        })

    } catch (error) {
        console.log(`Error in verification controller : ${error}`);
        res.status(500).json({
            message : "Internal server error"
        });
    }
}