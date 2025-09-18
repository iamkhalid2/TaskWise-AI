import ratelimit from "../lib/upstash.js"

const rateLimit = async (req,res,next) => {
    try {
        const userId = req.user._id
        const success = await ratelimit.limit(userId )

        if(!success){
            return res.status(429).json({
                message : "Too many response, please try later"
            })
        }

        next()
    } catch (error) {
        console.log(`Error in rateLimite middleware : ${error}`);
        res.status(500).json({
            message : "Internal server error"
        });
    }
}

export default rateLimit