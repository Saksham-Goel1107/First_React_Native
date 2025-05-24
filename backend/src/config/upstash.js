import { Redis } from '@upstash/redis'
import {Ratelimit} from '@upstash/ratelimit'
import "dotenv/config"

const ratelimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "60 s"), // 50 requests per minute per IP
  prefix: "dineout-api-ip"
})

export default ratelimiter