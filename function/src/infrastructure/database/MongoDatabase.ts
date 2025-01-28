import mongoose from 'mongoose';
import { Environments } from '../config/Enviroments';

export class MongoDatabase {
  private static isConnected = false;

  static async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('🗄️  Already connected to MongoDB.');
      return;
    }

    const uri = Environments.getMongoUri();

    try {
      await mongoose.connect(uri);
      this.isConnected = true;
      console.log('🗄️  Connected to MongoDB.');
    } catch (error) {
      console.error('❌ Error connecting to MongoDB:', error);
      throw new Error('Database connection failed.');
    }
  }

  static async disconnect(): Promise<void> {
    if (!this.isConnected) return;
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('🗄️  Disconnected from MongoDB.');
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error);
    }
  }
}
