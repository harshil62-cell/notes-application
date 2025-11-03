const express=require('express');
const dotenv=require('dotenv').config();
const {connectToDb}=require('./Config/dbConnection');
const userRoutes=require('./routes/userRoutes');

connectToDb();
const app=express();
const port=process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users',userRoutes);

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});

