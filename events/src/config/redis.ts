import { createClient } from 'redis';

export const redisClient = createClient({
    url: process.env.REDIS_URL
});

const connectRedis = async () => {
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