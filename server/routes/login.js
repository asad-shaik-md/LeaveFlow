import User from "../models/User.js";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

const router = express.Router();

function validateLogin(user) {
  const schema = Joi.object({
    employeeID: Joi.number().min(5).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

const loginUser = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ employeeID: req.body.employeeID });
    if (!user) return res.status(400).send("Invalid EmployeeID or Password.");

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword)
      return res.status(400).send("Invalid EmployeeID or Password.");

    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      .header("Access-Control-Expose-Headers", "x-auth-token")
      .status(200)
      .send(token);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

router.post("/", loginUser);

export default router;
