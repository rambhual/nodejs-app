const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../Models/user");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const isExists = await User.findOne({ email });
  if (isExists)
    return res.status(400).send(`user already registered with ${email}`);
  const salt = await new bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await User({
    name,
    email,
    password: hashPassword
  });
  const response = await user.save();
  res.status(201).send(_.pick(response, ["_id", "name", "email"]));
});

module.exports = router;
