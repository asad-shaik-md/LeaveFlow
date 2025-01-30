"use client";

import Image from "next/image";
import Link from "next/link";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import loginRequest from "@/utils/loginRequest";

interface Credentials {
  employeeID: number;
  password: string;
};

const errorMessages = {
  "string.base": "This field should be a type of text",
  "string.empty": "This field cannot be an empty field",
  "string.min": "This field should have a minimum length of {#limit}",
  "string.max": "This field should have a maximum length of {#limit}",
  "any.required": "This field is required"
};

const schema = Joi.object({
  employeeID: Joi.string().min(5).required().messages(errorMessages),
  password: Joi.string().min(5).max(1024).required().messages(errorMessages),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<Credentials>({
    resolver: joiResolver(schema),
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data: Credentials) => {
    const result = await loginRequest(data);

    if (result.success) {
      router.push('/');
    } else {
      alert(result.error);
    }
  });
  
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
            Login
          </h1>
          <hr className="h-[0] w-auto mt-4 border-[1] bg-[#D7DEDD]" />

          <form onSubmit={onSubmit}>
            <div className="mt-4">
              <label htmlFor="employeeID" className="block text-[12px] ">
                Employee ID
              </label>
              <input
                id="employeeID"
                type="number"
                placeholder="12345"
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

          <div className="flex justify-between text-sm mb-10">
            <Link href="/register" className="text-[#5A67BA] hover:underline">
              Register
            </Link>
            <Link
              href="/forgot-password"
              className="text-[#5A67BA] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
