import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  employeeID: {
    type: Number,
    unique: true,
    required: true,
    length: 5,
  },
  name: {
    type: String,
    required: true,
    max: 155,
  },
  password: {
    typr: String,
    required: true,
    min: 5,
    max: 1024
  },
  role: {
    type: String,
    enum: ["employee", "admin"],
    default: "employee"
  }
});

const User = mongoose.model("User", UserSchema);
export default User;