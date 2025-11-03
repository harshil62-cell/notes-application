const express=require('express');
const dotenv=require('dotenv').config();
const {connectToDb}=require('./Config/dbConnection');

connectToDb();
const app=express();
const port=process.env.PORT || 5000;

app.use(express.json());

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});

