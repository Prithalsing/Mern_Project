import mongoose from "mongoose";

const connectToMongodb = async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongodb")
  } catch (error) {
    console.log('error', error);
  }
};

export default connectToMongodb;

// import mongoose from "mongoose";

// const connectToMongoDB = async () => {
// 	try {
// 		await mongoose.connect(process.env.MONGO_DB_URI);
// 		console.log("Connected to MongoDB");
// 	} catch (error) {
// 		console.log("Error connecting to MongoDB", error.message);
// 	}
// };

// export default connectToMongoDB;