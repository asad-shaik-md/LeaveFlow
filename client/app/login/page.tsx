import Image from "next/image";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="font-[family-name:var(--font-poppins)] flex justify-center items-center gap-2 mt-10">
        <Image
          className="rounded-full"
          src="/LeaveFLow.png"
          alt="logo"
          width={50}
          height={50}
        />
        <h1 className="text-lg text-[#5A67BA]">LeaveFLow</h1>
      </div>

      <div className="w-full max-w-[400px] border-[1px] border-[#D7DEDD] px-[40px] mt-40 rounded-md font-[family-name:var(--font-outfit)]">
        <h1 className="text-2xl text-[#5A67BA] font-bold pt-10 text-center">
          Login
        </h1>
        <hr className="h-[0] w-auto mt-4 border-[1] bg-[#D7DEDD]" />

        <form>
          <div className="mt-4">
            <label htmlFor="employeeId" className="block text-[12px] ">
              Employee ID
            </label>
            <input
              id="employeeId"
              type="text"
              placeholder="123456"
              className="w-full border-black border-b mt-1 p-2 focus:outline-none"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-[12px] ">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="******"
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

        <div className="flex justify-between text-sm mb-10">
          <a href="/register" className="text-[#5A67BA] hover:underline">
            Register
          </a>
          <a href="/forgot-password" className="text-[#5A67BA] hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
