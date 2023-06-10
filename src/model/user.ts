const mongoose = require("mongoose");

// Teacher Schema
const teacherSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  first_name: String,
  last_name: String,
  date_of_birth: Date,
  address: String,
  email: String,
  phone_number: String,
  role: {
    type: Number,
    default: 1,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

// Student Schema
const studentSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  first_name: String,
  last_name: String,
  date_of_birth: Date,
  address: String,
  email: String,
  phone_number: String,
  guardian_name: String,
  guardian_phone: String,
  role: {
    type: Number,
    default: 3,
  },
});

const Student = mongoose.model("Student", studentSchema);

export { Student, Teacher };
