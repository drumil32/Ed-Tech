import { createClient } from 'redis';

export const redisClient = createClient({
    url: process.env.REDIS_URL
});

const connectRedis = async () => {
    console.log(process.env.REDIS_URL);
    // Connect to your internal Redis instance using the REDIS_URL environment variable
    // The REDIS_URL is set to the internal Redis URL e.g. redis://red-343245ndffg023:6379
    redisClient.on('error', (err) => {
        console.log("from on error")
        console.log(err);
        console.log(err.message);
        process.exit(1);
    });
    try {
        await redisClient.connect();
    } catch (error) {
        console.log(error);
        console.log("Could not connect to Redis");
        process.exit(1);
    }
    console.log("Radis client connected");
};

export default connectRedis;