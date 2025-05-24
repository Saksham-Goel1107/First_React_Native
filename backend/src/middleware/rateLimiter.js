import ratelimiter from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const ip =
      req.ip ||
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "unknown";

    const { success, limit, remaining, reset } = await ratelimiter.limit(ip);

    // Set rate limit info in headers
    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);    if (!success) {
      // Calculate seconds until reset
      const secondsUntilReset = Math.ceil((reset - Date.now()) / 1000);
      
      return res.status(429).json({
        message: "Too many requests from this IP address",
        retryAfter: {
          seconds: secondsUntilReset,
          message: `Please try again in ${secondsUntilReset} seconds`
        }
      });
    }
    next();
  } catch (error) {
    console.log(`Error in rate limiter : ${error}`);
    next(error);
  }
};

export default rateLimiter;
