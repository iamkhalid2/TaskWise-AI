import client from "./openRouter.js";
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Secondary AI provider (using OpenAI's API with different base URL)
const secondaryClient = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1'
});

/**
 * Get responses from two different AI models simultaneously
 * @param {string} prompt - User's input prompt
 * @returns {Promise<Object>} - Object containing responses from both models
 */
export const getDualModelResponse = async (prompt) => {
    try {
        // Call both models in parallel for faster response
        const [response1, response2] = await Promise.all([
            // Model 1: GPT-4o-mini
            client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500,
            }),
            // Model 2: Claude Sonnet (or another model from OpenRouter)
            secondaryClient.chat.completions.create({
                model: "anthropic/claude-3.5-sonnet", // Alternative model
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500,
            })
        ]);

        return {
            model1: {
                name: "GPT-4o-mini",
                response: response1.choices[0].message.content,
                model: response1.model
            },
            model2: {
                name: "Claude 3.5 Sonnet",
                response: response2.choices[0].message.content,
                model: response2.model
            }
        };
    } catch (error) {
        console.error('Error in getDualModelResponse:', error);
        throw error;
    }
};
