import { createClient } from 'redis';

export const redisClient = createClient({
    url: process.env.REDIS_URL
});

const connectRedis = async () => {
    // Connect to your internal Redis instance using the REDIS_URL environment variable
    // The REDIS_URL is set to the internal Redis URL e.g. redis://red-343245ndffg023:6379
    redisClient.on('error', (err) => {
        console.log(err.message);
        process.exit(1);
    });
    try {
        await redisClient.connect();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    console.log("Radis client connected");
};

export default connectRedis;