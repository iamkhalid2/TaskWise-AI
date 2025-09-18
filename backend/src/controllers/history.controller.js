import User from "../models/User.js"

export const getResponse = async (req,res) => {
    try {
        const Id = req.user._id;
        const { id : responseId } = req.params;
        console.log(responseId)

        const user = await User.findById(Id)
        console.log(user)

        const historyItem = user.history.find(item => item._id.equals(responseId))
        console.log("data : ",historyItem)
        
        if(!historyItem){
            return res.status(404).json({
                message : "user not found"
            })
        }

        res.status(200).json(historyItem)

    } catch (error) {
        console.log(`Error specific response ${error}`);
        res.status(500).json({
            message : "Internal server error"
        });
    }
}

export const getResponses = async (req,res) => {
    try {
        const Id = req.user._id
        const userHistory = await User.findById(Id)
        
        if(!userHistory){
            return res.status(404).json({
                message : "user not found"
            })
        }

        res.status(200).json(userHistory.history)

    } catch (error) {
        console.log(`Error in get-response controller ${error}`);
        res.status(500).json({
            message : "Internal server error"
        });
    }
}

export const deleteAllHistory = async (req,res) => {
    try {
        const userId = req.user._id
        const deletedHistory = await User.findByIdAndUpdate(
            userId,
            { $set : { history : [] } },
            { new : true}
        )
        if(!deletedHistory){
            return res.status(404).json({
                message : "responses not found"
            });
        }

        console.log(userId.history);
        
        res.status(200).json({
            success : true,
            message : "History cleared successfully"
        })
    } catch (error) {
        console.log(`Error in deleteAllHistory controller : ${error}`);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

export const deleteResponse = async (req,res) => {
    try {
        const userId = req.user._id
        const { id : responseId } = req.params
        
        const deletedRes = await User.findByIdAndUpdate(
            userId,
            { $pull : { history : { _id : responseId } } },
            { new : true }
        )

        if(!deletedRes){
            return res.status(404).json({
                message : "response not delete"
            })
        }

        console.log(userId.history);
        
        res.status(200).json({
            success : true,
            message : "response deleted successfully"
        });

    } catch (error) {
        console.log(`Error in delete-response controller : ${error}`);
        res.status(500).json({
            message : "Internal server error"
        });
    }
}
