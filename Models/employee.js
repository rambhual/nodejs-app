const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
  name: { type: String },
  email: String,
  address: String,
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department"
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
