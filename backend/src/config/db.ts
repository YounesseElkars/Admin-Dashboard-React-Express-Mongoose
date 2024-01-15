import mongoose, { Error } from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI as string;
    const conn = await mongoose.connect(mongoURI);
    console.log(`MONGOFB Connected ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
