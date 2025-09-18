import User from "../models/User.js";
import { smartModelSelector } from "../services/selectmodel.js";

export const getResponse = async (req,res) => {
    const userId = req.user._id
    const { prompt } = req.body;

    try {
        

        if(!prompt || typeof prompt !== "string"){
            return res.status(400).json({
                message : "prompt is required"
            })
        }
  
        const aiRes = await smartModelSelector(prompt);
        const textOrImage = aiRes?.choices?.[0]?.message?.content ?? aiRes?.data[0]?.b64_json 


        
        const user = await User.findByIdAndUpdate( 
            //query to find
            { _id : userId},
            //to update
            {
                $push : {
                    history : {
                        prompt,
                        response : textOrImage,
                        modelUsed : aiRes?.model,
                        createdAt : new Date(),
                    }
                },
            },
            { new : true }
        )

        if(!user){
            return res.status(404).json({
                message : "User not exist"
            })
        }

        res.status(200).json({
            success : true,
            response : user.history,
        })

    } catch (error) {
        if(req.creditReserved){
            await User.updateOne(
                { _id: userId },
                { $inc: { credits : +1 } },
            )
        }
        console.log(`Error in get-response controller ${error}`);
        res.status(500).json({
            message : "Internal server error"
        });
    }

}