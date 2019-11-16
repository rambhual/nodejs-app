var express = require("express");
const Department = require("../Models/department");
var router = express.Router();

// TODO: Get Departments
router.get("/", async function(req, res, next) {
  const departments = await Department.find({}).populate("employeeId");
  res.status(200).send(departments);
});

router.post("/", async function(req, res, next) {
  const { name } = req.body;
  const department = new Department({
    name
  });
  const result = await department.save();
  res.status(201).send(result);
});

module.exports = router;
