const express = require("express");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../Models/user");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send(`Invalid email or password`);
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send(`Invalid email or password`);
  res.send(true);
});

function validate(req) {
  const schema = Joi.object().keys({
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  });
  return Joi.validate(req, schema);
}
module.exports = router;
