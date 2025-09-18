import User from "../models/User.js"

export const updateProfile = async (req,res) => {
    try {
        const { loggedId } = req.user._id
        const { username , profilePic } = req.body

        const updateUserData = await User.findByIdAndUpdate({loggedId},{
            username,
            profilePic,    
        },{ new :  true });
        
        if(!updateUserData){
            return res.status(404).json({
                message : "User not exist"
            })
        }
        
        res.status(200).json(updateUserData)

    } catch (error) {
        console.log(`Error in updateProfile controller : ${error}`);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

export const deleteUser = async (req,res) => {
    try {
        const { userId } = req.user._id
        const user = await User.findByIdAndDelete(userId,{ new : true })
        if(!user){
            return res.status(404).json({
                message : "user not exist"
            })
        }

        res.status(200).json(user)

    } catch (error) {
        console.log(`Error in delete controller : ${error}`);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

