import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import dotenv from 'dotenv'

dotenv.config()

const redis = new Redis({
    url : process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
})

const ratelimit = new Ratelimit({
    redis,
    limiter:Ratelimit.fixedWindow(3,"60 s")
})

console.log(" :"+ ratelimit)

export default ratelimit