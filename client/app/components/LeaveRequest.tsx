"use client";

import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect, useState } from "react";
import leaveSubmission from "@/utils/leaveRequestSubmission";

interface Decoded {
  employeeID: string;
  name: string;
}
interface LeaveData {
  name: string;
  employeeID: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string | undefined | null;
}

const errorMessages = {
  "any.base": "This field should be a type of text",
  "date.base": "Please enter a valid date",
  "string.empty": "This field cannot be an empty field",
  "date.empty": "This field cannot be an empty field",
  "any.required": "This field is required",
  "date.greater": "The date must be today or in the future",
};

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const schema = Joi.object({
  name: Joi.string(),
  employeeID: Joi.string(),
  leaveType: Joi.string().min(2).required().messages(errorMessages),
  startDate: Joi.date()
    .greater(yesterday.toISOString())
    .required()
    .messages(errorMessages),
  endDate: Joi.date()
    .greater(yesterday.toISOString())
    .required()
    .messages(errorMessages),
  reason: Joi.string().allow(""),
});

const LeaveRequest = () => {
  const [decodedData, setDecodedData] = useState<Decoded>({
    name: "",
    employeeID: "",
  });

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const payload = jwtDecode<Decoded>(token);
    const { name, employeeID } = payload;

    setDecodedData({
      name: name || '',
      employeeID: employeeID || ''
    })
    setLoading(false);
  }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeaveData>({
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit(async (data: LeaveData) => {
    console.log('clicked')
    const result = await leaveSubmission(data)

    if (result.success) {
      console.log('leave Submitted successfully')
    } else {
      alert(result.error);
    }
  });

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="max-w-[400px] p-10 m-[35px] flex flex-col gap-4 border-[#D7DEDD] border-[1px] font-[family-name:var(--font-outfit)]">
      <h1 className="text-center text-2xl font-semibold text-[#5A67BA]">
        Leave Request Form
      </h1>
      <hr className="h-[0] w-auto border-[1] bg-[#D7DEDD]" />

      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between gap-8">
          <div className="mt-4">
            <label htmlFor="name" className="block text-[12px] text-gray-400">
              Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue={decodedData.name}
              readOnly
              {...register("name")}
              className="w-full border-gray-400 border-b mt-1 p-2 text-gray-400 focus:outline-none"
            />
            {errors.name && (
            <p className="text-red-600 text-xs mt-1">
              {errors.name.message?.toString()}
            </p>
          )}
          </div>

          <div className="mt-4">
            <label htmlFor="employeeID" className="block text-[12px] text-gray-400">
              Employee ID
            </label>
            <input
              id="employeeID"
              type="number"
              defaultValue={decodedData.employeeID}
              readOnly
              {...register("employeeID")}
              className="w-full border-gray-400 border-b mt-1 p-2 text-gray-400 focus:outline-none"
            />
            {errors.employeeID && (
            <p className="text-red-600 text-xs mt-1">
              {errors.employeeID.message?.toString()}
            </p>
          )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="leaveType" className="block text-[12px] ">
            Leave Type
          </label>
          <select
            id="leaveType"
            {...register("leaveType")}
            className="w-full border-black border-b mt-1 p-2 focus:outline-none"
          >
            <option value="">Choose the Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Causal Leave">Causal Leave</option>
            <option value="Vacation Leave">Vacation Leave</option>
          </select>
          {errors.leaveType && (
            <p className="text-red-600 text-xs mt-1">
              {errors.leaveType.message?.toString()}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="startDate" className="block text-[12px] ">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            {...register("startDate")}
            className="w-full border-black border-b mt-1 p-2 focus:outline-none"
          />
          {errors.startDate && (
            <p className="text-red-600 text-xs mt-1">
              {errors.startDate.message?.toString()}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="endDate" className="block text-[12px] ">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            placeholder=""
            {...register("endDate")}
            className="w-full border-black border-b mt-1 p-2 focus:outline-none"
          />
          {errors.endDate && (
            <p className="text-red-600 text-xs mt-1">
              {errors.endDate.message?.toString()}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="reason" className="block text-[12px] ">
            Reason
          </label>
          <input
            id="reason"
            type="text"
            {...register("reason")}
            placeholder="Optional"
            className="w-full border-black border-b mt-1 p-2 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full h-[40px] bg-[#5A67BA] hover:bg-[#4C5490] text-white my-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeaveRequest;
