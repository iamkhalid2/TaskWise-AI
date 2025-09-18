import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    orderId: {
        type: String,
        required:true,
    },

    paymentId: {
        type: String,
    },

    signature:{
        type: String
    },       

    amount: {
        type:Number
    },
    currency: {
        type: String,
        default: "INR"
    },

    status:{
        type: String,
        enum: ["created", "paid" , "failed"],
        default: "created"
    },

    creditAdded: {
        type: Number,
        default:0
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Payment = mongoose.model("Payment",PaymentSchema)

export default Payment