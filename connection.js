import mongoose from "mongoose";
import EmployeeModel from "./Model/employeeSchema.js";
const connectDB= async ()=>{
    try{
  await mongoose.connect(process.env.connectionString);
  
 
  console.log("connected to database")
    await EmployeeModel.syncIndexes();
    }
    catch(error){
 console.log(error.message)  
    }
   
}

export default connectDB