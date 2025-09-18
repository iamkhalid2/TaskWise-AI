import mongoose from 'mongoose'

export const connectDB = async () =>{

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`database connected successfully`)
    } catch (error) {
        console.error(`Error while connecting to mongo db : ${error}`);
        process.exit(1)
    }
    
}