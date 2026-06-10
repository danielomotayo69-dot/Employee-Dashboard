import EmployeeModel from "../Model/employeeSchema.js";
import express from "express";

const router = express.Router();

router.post("/post", async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);

    res.status(201).json({
      message: "account created successfully",
      employee,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validateError = {};

      Object.keys(error.errors).forEach((key) => {
        validateError[key] = error.errors[key].message;
      });

      return res.status(400).json({
        errors: validateError,
      });
    }

    return res.status(500).json({
      message: "server error",
    });
  }
});

router.get("/filter", async (req,res)=>{
  
     const search= req.query.search || "";
     const filter= search ? 
     
     {
       $or: [
        {
         fullname: {$regex: search, $options: "i"}
        },
        {
          email: {$regex: search, $options: "i"}
        },
        {
          department: {$regex: search, $options: "i"}
        },
        {
          position: {$regex: search, $options: "i"}
        },
        {
          employeeid: {$regex: search, $options: "i"}
        }
       ]
     } 
     :
     {};

     try{
   const employee= await EmployeeModel.find(filter);
    res.status(200).json({
       message: "employees",
        employee
    })
     }
    catch(error){
      res.status(500).json({
         error: error.message
      })
    }

  
})


router.get("/", async (req, res) => {
  try {
    const employee = await EmployeeModel.find();

    res.status(200).json({
      message: "employee details",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const employee = await EmployeeModel.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "employee not found",
      });
    }

    res.status(200).json({
      message: "deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const employee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        message: "employee not found",
      });
    }

    res.status(200).json({
      message: "employee updated successfully",
      employee,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validateError = {};

      Object.keys(error.errors).forEach((key) => {
        validateError[key] = error.errors[key].message;
      });

      return res.status(400).json({
        errors: validateError,
      });
    }

    return res.status(500).json({
      message: "server error",
    });
  }
});



export default router;