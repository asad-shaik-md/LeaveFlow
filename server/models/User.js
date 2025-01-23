import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const UserSchema = mongoose.Schema({
  employeeID: {
    type: Number,
    required: true,
    unique: true,
    length: 5,
  },
  name: {
    type: String,
    required: true,
    max: 155,
  },
  password: {
    type: String,
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

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id}, process.env.JWT_PRIVATE_KEY)
  return token
}

const User = mongoose.model("User", UserSchema);
export default User;