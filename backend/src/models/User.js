import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    
    username : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String,
        unique : true,
        required : true,
        lowercase : true
    },

    password : {
        type : String,
        required : true,
        minlength : 6
    },
    
    profilePic : {
        type : String,
        default : ''
    },

    preferences : {
        defaultModel : {
            type : String,
            enum : ['gpt4','claude','stable-diffusion'],
            default : 'gpt4'
        },
        language : {
            type : String,
            default : 'en'
        },
    },

    history : [
        {
            prompt : String,
            response : String,
            modelUsed : String,
            createAt : {
                type : Date,
                default : Date.now
            },
        },
    ],

    credits : {
        type : Number,
        default : 10
    },
    
}, { timestamps : true })

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
        next();
    } catch (error) {
        console.log('Error while generating hash password')
    }
})

const User = mongoose.model("User",UserSchema);

export default User