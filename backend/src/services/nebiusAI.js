import OpenAI  from "openai";
import dotenv from 'dotenv'

dotenv.config()

const model = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: process.env.NEBIUS_API_KEY,
});

export default model