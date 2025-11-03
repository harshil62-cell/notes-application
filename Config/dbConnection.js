const mongoose=require('mongoose');

const connectToDb=async()=>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting db",error);
        process.exit(1);
    }
};

module.exports={
    connectToDb
}