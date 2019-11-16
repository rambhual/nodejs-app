const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 250 },
  isGold: { type: Boolean, default: false },
  phone: { type: String, required: true }
});

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  const customer = await Customer.find();
  res.status(200).send(customer);
});

router.post("/", async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  const saveCustomer = await customer.save();
  res.status(200).send(saveCustomer);
});

module.exports = router;
