import mongoose from "mongoose";

const LeaveRequestSchema = mongoose.Schema({
  employeeID: {
    type: Number,
    required: true,
    length: 5,
  },
  name: {
    type: String,
    required: true,
    max: 155,
  },
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Vacation Leave"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.startDate;
      },
      message: "End date must be greater than or equal to the start date.",
    },
  },
  reason: {
    type: String,
    max: 255,
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const LeaveRequest = mongoose.model("LeaveRequest", LeaveRequestSchema);
export default LeaveRequest;
