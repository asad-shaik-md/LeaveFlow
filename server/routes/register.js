import User from "../models/User.js";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const router = express.Router();

const registerUser = async (req, res) => {
  let user = await User.findOne({ employeeID: req.body.employeeID });
  if (user) return res.status(400).send("User Already Registered!");

  user = new User({
    employeeID: req.body.employeeID,
    name: req.body.name,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send({
    employeeID: user.employeeID,
    name: user.name,
  });
};

router.post("/", registerUser);

export default router;
