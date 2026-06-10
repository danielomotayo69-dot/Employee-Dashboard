import express from 'express'
import cors from 'cors'
import connectDB from './connection.js';
import router from './Router/router.js';
import dotenv from 'dotenv'

const app= express();
const port= 3000;
dotenv.config()
connectDB()

//middle wares //
app.use(express.json());
app.use(cors());
app.use("/employee", router);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})