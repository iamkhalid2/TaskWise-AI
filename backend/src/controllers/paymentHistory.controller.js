import Payment from "../models/Payment.js"

export const getPurchaseHistory = async (req,res) => {
    try {
        const Id = req.user._id
        const paymentHistory = await Payment.find({user : Id}).sort({ createdAt : -1})
        res.status(200).json(paymentHistory)
    } catch (error) {
        console.log(`Error in getPurchasehistory controller ${error}`);
        res.status(500).json({
            message : "Internal server error"
        });
    }
}

