const express=require('express');
const dotenv=require('dotenv').config();
const {connectToDb}=require('./Config/dbConnection');
const userRoutes=require('./routes/userRoutes');
const noteRoutes=require('./routes/noteRoutes');

connectToDb();
const app=express();
const port=process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});

