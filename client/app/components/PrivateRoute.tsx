"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
        router.push('/login')
    }
  }, [router, token])

  return token ? <>{children}</> : null;
};

export default PrivateRoute;
