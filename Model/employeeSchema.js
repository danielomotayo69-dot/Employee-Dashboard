import mongoose from "mongoose";
import validator from "validator";

const EmployeeSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "this field is required"],
    minLength: [4, "name can't be below 4"],
    maxLength: [20, "name can't be more than 20"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "this field is required"],
    validate: {
      validator: validator.isEmail,
      message: "please enter a valid email",
    },
  },

  age: {
    type: Number,
    required: [true, "this field is required"],
    min: [18, "you can't be below 18"],
    max: [100, "you can't be above 100"],
  },

  department: {
    type: String,
    required: [true, "this field is required"],
    minLength: [2, "dept can't be below 2"],
    maxLength: [20, "dept can't be more than 20"],
  },

  position: {
    type: String,
    required: [true, "this field is required"],
    minLength: [4, "position can't be below 4"],
    maxLength: [20, "position can't be more than 20"],
  },

  employeeid: {
    type: String,
    required: true,
    unique: true
  }
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);

export default EmployeeModel;