import User from "../models/User.js";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";

const router = express.Router();

function validateRegister(user) {
  const schema = Joi.object({
    employeeID: Joi.string().min(5).required(),
    name: Joi.string().min(5).max(155).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

const registerUser = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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

    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      .header("Access-Control-Expose-Headers", "x-auth-token")
      .status(200)
      .send({
        employeeID: user.employeeID,
        name: user.name,
      });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

router.post("/", registerUser);

export default router;
