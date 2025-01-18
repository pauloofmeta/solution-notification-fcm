import { connect, disconnect } from "mongoose";

const connectToDataBase = async (): Promise<boolean> => {
  const uri =
    process.env.MONGO_URI ||
    "mongodb://root:admin123@localhost:27017/solution?authSource=admin";

  try {
    await connect(uri);
    console.log("🗄️  Connected to MongoDB.");
    return true;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    return false;
  }
};

const disconnectToDatabase = async (): Promise<void> => {
  await disconnect();
  console.log("🗄️  Disconnected to MongoDB");
};

export default { connectToDataBase, disconnectToDatabase };
