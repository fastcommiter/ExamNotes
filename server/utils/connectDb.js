import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.log("DB ERROR");
        console.log(error.message);
    }
};

export default connectDb;