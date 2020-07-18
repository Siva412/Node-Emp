const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const employeeSchema = mongoose.Schema({
    empId: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    domain: {type: String, required: true},
    designation: {type: String, required: true},
    role: {type: String, required: true},
    testType: {type: String}
});

employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Employee", employeeSchema);
