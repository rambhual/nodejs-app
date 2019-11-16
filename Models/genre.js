const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;

const GenreSchema = mongoose.model(
  "Genre",
  new Schema({
    name: { type: String }
  })
);

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required()
  };
  return Joi.validate(genre, schema);
}
module.exports = mongoose.model("Genre", GenreSchema);
exports.GenreSchema = GenreSchema;
exports.validate = validateGenre;
