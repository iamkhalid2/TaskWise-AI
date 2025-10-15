import User from "../models/User.js";
import bycrpt from 'bcryptjs'
import { generateWebToken } from "../lib/generateToken.js";

export const signupRoute = async (req,res) => {
    
    const { username , email , password } = req.body;
    
    try {

        if(!username || !email ||!password ){
            return res.status(400).json({
                message : `All fields are required`
            })
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        
        if(!regex.test(email)){
            return res.status(400).json({
                message : 'Invalid email format'
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                message : 'password must be atleast 6 character'
            })
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                message : 'Email already exist! please use different email'
            })
        }

        function pickRandomAvatar(){
            const value = Math.floor(Math.random() * 100) + 1
            const avatar = `https://avatar.iran.liara.run/public/${value}`;
            return avatar
        }
 

        const newUser = await User.create({
            username,
            email,
            password,
            profilePic : pickRandomAvatar() || '',
        })

        generateWebToken(newUser._id,res)

        res.status(200).json({
            success : true,
            user : newUser,
        })

    } catch (error) {
        console.log(`Error in signup controller : ${error}`);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

export const loginRoute = async (req,res) => {
    try {
        const { email , password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message : "All fields are required"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                message : "password must be at least 6 character"
            })
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if(!regex.test(email)){
            return res.status(400).json({
                message : "invalid email format"
            })
        }

        const user = await User.findOne({email})

        if(!user || !(await bycrpt.compare(password,user.password))){
            return res.status(400).json({
                message : "Invalid email or password",
            })
        }

        generateWebToken(user._id,res)

        res.status(200).json({
            success: true,
            message: 'login successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
                credits: user.credits,
            }
        })


    } catch (error) {
        console.log(`Error in login route controller ${error}`)
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

export const logoutRoute = async (req,res) => {
    try {
        res.clearCookie('jwt')
        res.status(200).json({
        message : "logout successfully"
    })
    } catch (error) {
        console.log(`Error in logout controller : ${error}`)
        res.status(500).json({
            message : "Internal server error"
        })
    }
} 

