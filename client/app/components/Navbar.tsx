import Image from "next/image";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="min-w-full flex items-center justify-between px-8 py-[7.5px] border-b-[1px] border-[#D7DEDD] font-[family-name:var(--font-outfit)]">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          src="/LeaveFLow.png"
          alt="logo"
          width={32}
          height={32}
        />
        <h1 className="text-[#5A67BA] text-[13px] font-bold font-[family-name:var(--font-poppins)]">
          LeaveFLow
        </h1>
      </div>

      <div className="flex items-center justify-center gap-2 py-1">
        <div className="flex items-center justify-center gap-1">
          <Link
            href="/dashboard"
            className="text-[13px] text-[#5A67BA] font-medium  bg-[#707FDD] bg-opacity-10 px-7 py-2 rounded-md"
          >
            Dashboard
          </Link>
          <Link
            href="/login"
            className="text-[13px] text-[#5A67BA] font-medium bg-opacity-10 px-7 py-2 rounded-md"
          >
            Leave History
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <button>
            <CgProfile className="text-[35px] text-[#5A67BA]"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
