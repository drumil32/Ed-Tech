import { set, connect, createConnection } from 'mongoose';

export let primaryDb;

export const connectDB = async () => {
    primaryDb = createConnection(process.env.PRIMARY_MONGO_URL, { dbName: process.env.PRIMARY_DB })
    try {
        set("strictQuery", false);
        const conn = await connect(process.env.MONGO_URL, { dbName: process.env.DB });
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;