import LeaveRequest from "../models/LeaveRequest.js";
import express from "express";
import mongoose from "mongoose";
import Joi from "joi";

const router = express.Router();

function validateLeaveRequest(LeaveRequest) {
  const schema = Joi.object({
    employeeID: Joi.number().min(5).required(),
    name: Joi.string().min(5).required(),
    leaveType: Joi.string().min(5).required(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    reason: Joi.string().allow(""),
  });

  return schema.validate(LeaveRequest);
}

const loginRequest = async (req, res) => {
  try {
    const { error } = validateLeaveRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const leaveData = new LeaveRequest({
      employeeID: req.body.employeeID,
      name: req.body.name,
      leaveType: req.body.leaveType,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reason: req.body.reason,
    });

    await leaveData.save();

    res.status(200).send(leaveData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const pendingRequests = async (req, res) => {
  try {
    const pendingLeaves = await LeaveRequest.find({ status: "Pending" }).select(
      "-status -employeeID"
    );

    res.status(200).send(pendingLeaves);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const approveLeave = async (req, res) => {
  try {
    const approve = await LeaveRequest.findByIdAndUpdate(
      { _id: req.params.id },
      { status: "Approved" }
    );

    res.status(200).send(approve);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const rejectLeave = async (req, res) => {
  try {
    const reject = await LeaveRequest.findByIdAndUpdate(
      { _id: req.params.id },
      { status: "Rejected" }
    );

    res.status(200).send(reject);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

router.post("/", loginRequest);
router.get("/pending", pendingRequests);
router.put("/:id/approve", approveLeave);
router.put("/:id/reject", rejectLeave);

export default router;
