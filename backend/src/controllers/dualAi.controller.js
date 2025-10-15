import User from "../models/User.js";
import { getDualModelResponse } from "../services/dualModel.js";

export const getDualResponse = async (req, res) => {
    const userId = req.user._id;
    const { prompt } = req.body;

    try {
        if (!prompt || typeof prompt !== "string") {
            return res.status(400).json({
                message: "prompt is required"
            });
        }

        // Get responses from both models
        const dualResponses = await getDualModelResponse(prompt);

        // Store both responses in user history
        const user = await User.findByIdAndUpdate(
            { _id: userId },
            {
                $push: {
                    history: {
                        prompt,
                        response: JSON.stringify(dualResponses), // Store as JSON string
                        modelUsed: `${dualResponses.model1.name} + ${dualResponses.model2.name}`,
                        createdAt: new Date(),
                    }
                },
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not exist"
            });
        }

        res.status(200).json({
            success: true,
            response: dualResponses,
            prompt: prompt
        });

    } catch (error) {
        // Refund credit if reserved
        if (req.creditReserved) {
            await User.updateOne(
                { _id: userId },
                { $inc: { credits: +1 } },
            );
        }
        console.log(`Error in get-dual-response controller ${error}`);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
