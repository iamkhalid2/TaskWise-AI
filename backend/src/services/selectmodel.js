import client from "./openRouter.js";
import imageModel from './nebiusAI.js'

// Model mapping based on prompt type
const modelMap = {
  code: "gpt-4o-mini",          // code tasks
  text: "gpt-4o-mini",          // general text
  summarization: "gpt-4o-mini", // summarization
  sentiment: "gpt-4o-mini",     // sentiment analysis
  image: "gpt-image-1",         // image generation
};

const taskLabels = ["summarization","image generation","sentiment analysis","text generation","code"]

async function detectTask(prompt) {

    const instruction = `
    Classify the type of task for the following text.
    The possible tasks are: ${taskLabels.join(", ")}.
    Text: "${prompt}"
    Return only the task label.
    `;

    console.log('instruction : ',instruction)

    //decide the which task to perform
    const response = await client.chat.completions.create({
        model : modelMap.text,
        messages : [{role : 'user', content : instruction}],
        max_tokens : 10,
    })

    console.log('response : ',response)

    const task = response.choices[0].message.content.trim().toLowerCase()

    if(!taskLabels.includes(task)){
        console.warn(`Unrecognized task : "${task}", defaulting to text generation. ` )
        return "text generation"
    }

    console.log('task : ',task)

    return task
}

// detectTask(prompt)
//   .then(console.log)
//   .catch(console.error);



export const smartModelSelector = async (prompt) => {
    
    const task = await detectTask(prompt)

    switch(task) {
        
        case "summarization": 
            return await client.chat.completions.create({
                model : modelMap.summarization,
                messages : [{ role : 'user', content : `summarize this prompt ${prompt}` }],
                max_tokens : 200,
            })

        case "image generation" : 
            return imageModel.images.generate({
                "model": "black-forest-labs/flux-schnell",
                "response_format": "b64_json",
                "response_extension": "png",
                "width": 1024,
                "height": 1024,
                "num_inference_steps": 4,
                "negative_prompt": "",
                "seed": -1,
                "loras": null,
                "prompt": prompt
            })

        case "sentiment analysis" : 
            return await client.chat.completions.create({
                model : modelMap.sentiment,
                messages : [{ role : "user" , content : `Analyze sentiment : ${prompt}` }],
                max_tokens : 200,
            })
            
        case "code": 
            return await client.chat.completions.create({
                model : modelMap.code,
                messages : [{ role : "user" , content : prompt }],
            })

        default : 
            return await client.chat.completions.create({
                model : modelMap.text,
                messages : [ { role : "user" , content : prompt }],
                max_tokens : 200,
                
            })
    }

}