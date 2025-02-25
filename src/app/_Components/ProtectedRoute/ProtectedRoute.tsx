"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import LoginPage from "@/app/(Pages)/login/page";
import RegisterPage from "@/app/(Pages)/register/page"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName=usePathname()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  useEffect(() => {
    const token = Cookies.get("token")||localStorage.getItem('token');

    if (token) {
      setIsCheckingAuth(false)
    } else {
      if (pathName !== "/login" && pathName !== "/register") {
        router.replace("/login"); 
      }
    }
  }, [pathName]);

  if (isCheckingAuth) {
    
     if(pathName=='/register'){
      return <div className="mt-14 pt-10">
      <RegisterPage/>
      
          </div>
    }else{
      return <div className="mt-14 pt-10">
      <LoginPage/>
      
          </div>
    }
   
  }
else{
  return <>{children}</>;
}
}
