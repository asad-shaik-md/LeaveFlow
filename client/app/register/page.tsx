"use client";

import Image from "next/image";
import Link from "next/link";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

const schema = Joi.object({
  employeeID: Joi.string().min(5).required().messages({
    "string.base": "Employee ID should be a type of text",
    "string.empty": "Employee ID cannot be an empty field",
    "string.min": "Employee ID should have a minimum length of 5",
    "any.required": "Employee ID is a required field",
  }),
  name: Joi.string().min(4).max(155).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be an empty field",
    "string.min": "Name should have a minimum length of 4",
    "string.max": "Name should have a maximum length of 155",
    "any.required": "Name is a required field",
  }),
  password: Joi.string().min(5).max(1024).required().messages({
    "string.base": "Password should be a type of text",
    "string.empty": "Password cannot be an empty field",
    "string.min": "Password should have a minimum length of 5",
    "string.max": "Password should have a maximum length of 1024",
    "any.required": "Password is a required field",
  }),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div>
      <div className="font-[family-name:var(--font-poppins)] flex justify-center items-center gap-2 mt-5">
        <Image
          className="rounded-full"
          src="/LeaveFLow.png"
          alt="logo"
          width={50}
          height={50}
        />
        <h1 className="text-lg text-[#5A67BA]">LeaveFLow</h1>
      </div>

      <div className="min-h-[90vh] flex flex-col justify-center items-center gap-[40px]">
        <div className="flex flex-col w-full max-w-[400px] border-[1px] border-[#D7DEDD] px-[40px] rounded-md font-[family-name:var(--font-outfit)]">
          <h1 className="text-2xl text-[#5A67BA] font-bold pt-10 text-center">
            Register
          </h1>
          <hr className="h-[0] w-auto mt-4 border-[1] bg-[#D7DEDD]" />

          <form onSubmit={onSubmit}>
            <div className="mt-4">
              <label htmlFor="employeeId" className="block text-[12px] ">
                Employee ID
              </label>
              <input
                id="employeeId"
                type="number"
                placeholder="123456"
                {...register("employeeID")}
                className="w-full border-black border-b mt-1 p-2 focus:outline-none"
              />
              {errors.employeeID && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.employeeID.message?.toString()}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="name" className="block text-[12px] ">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Joey Joe"
                {...register("name")}
                className="w-full border-black border-b mt-1 p-2 focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.name.message?.toString()}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block text-[12px] ">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="******"
                {...register("password")}
                className="w-full border-black border-b mt-1 p-2 focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-[40px] bg-[#5A67BA] hover:bg-[#4C5490] text-white my-4"
            >
              Submit
            </button>
          </form>

          <div className="flex justify-center text-sm mb-10">
            <Link href="/login" className="text-[#5A67BA] hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
