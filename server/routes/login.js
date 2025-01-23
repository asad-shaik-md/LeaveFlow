import User from "../models/User.js";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const router = express.Router();

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ employeeID: req.body.employeeID });
    if (!user) return res.status(400).send("Invalid EmployeeID or Password.");

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send("Invalid EmployeeID or Password.");

    const token = user.generateAuthToken()
    res.status(200).send(token)
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

router.post('/', loginUser);

export default router;
