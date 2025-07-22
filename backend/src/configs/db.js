import mongoose from "mongoose";

const connectDB = async () => {
    try{
        //console.log(process.env.MONGO_DB_URI);
        const conn = mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`MongoDB Connected: ${(await conn).connection.host}`.bgMagenta.white);
    }
    catch (error){
        console.log(error);
    }
};

export default connectDB;