import User from '../models/User.js'

export const creditUsage = async (req,res,next) => {
    try {
        const userId = req.user._id;
        
        const updated = await User.findByIdAndUpdate(
            {_id : userId , credits : { $gt : 0}},
            { $inc : { credits : -1 }},
            { new : true , projection : { password : 0 }}
        )

        if(!updated){
            return res.status(402).json({
                message : "Not enough credits"
            })
        }

        req.creditReserved = true

        next()

    } catch (error) {
        console.log(`Error in credit-usage middleware : ${error?.message}`);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}