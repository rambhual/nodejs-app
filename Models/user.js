const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255 },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 }
  })
);

function validateUser(user) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(5)
      .max(255)
      .required(),
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
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
