import mongoose from 'mongoose';
import { MONGODB_CONFIG } from '@/config/mongodb';

let isConnected = false;

export const connectToDB = async (): Promise<typeof mongoose> => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    return mongoose;
  }

  if (!MONGODB_CONFIG.URI) {
    throw new Error('Missing required environment variable: MONGODB_URI');
  }

  await mongoose.connect(MONGODB_CONFIG.URI, {
    dbName: MONGODB_CONFIG.DB_NAME,
  });

  isConnected = true;
  return mongoose;
};
