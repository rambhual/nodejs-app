const express = require("express");
const Employee = require("../Models/employee");
const router = express.Router();

// TODO: Will modified later or enhance some better
router.get("/", async (req, res, next) => {
  const employees = await Employee.find({}).populate("department");
  res.status(200).send(employees);
});

router.post("/", async (req, res, next) => {
  const { name, email, address, department } = req.body;
  await new Employee({
    name,
    email,
    address,
    department
  }).save();
  res.status(201).send("employee has been created successfully");
});
module.exports = router;
