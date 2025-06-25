import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log(response.connection.name);
  } catch (error) {
    console.log(error);
  }
};
