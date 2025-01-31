"use client";

import { getAuthToken } from "@/utils/getAuthToken";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  
  const router = useRouter();
  const token = getAuthToken();

  useEffect(() => {
    if (!token) {
        router.push('/login')
    }
  }, [router, token])
  
  return token ? <>{children}</> : null;
};

export default PrivateRoute;
