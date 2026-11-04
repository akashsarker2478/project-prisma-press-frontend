"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type FormState={
    success: boolean;
    statusCode?: number;
    message: string;
    data?: unknown;
} | null;

export const loginAction = async(prevState : FormState ,formData : FormData):Promise<FormState>=>{
    // console.log(formData);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const payload = {
        email,
        password
    }
    try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if(res.ok && result.success){
        const cookieStore = await cookies();
        if(result.data?.accessToken){
            cookieStore.set("accessToken",result.data.accessToken,{
                httpOnly:true,
                maxAge:60*60*24,//1 day
                sameSite:"lax",
                secure:process.env.NODE_ENV === "production"
            })
        };
        if(result.data?.refreshToken){
        cookieStore.set("refreshToken",result.data.refreshToken,{
            httpOnly:true,
            maxAge:60*60*24*7, //7day
            sameSite:"lax",
            secure:process.env.NODE_ENV === "production"
        })
    }

    redirect("/dashboard")

    };

   return result;
  } catch(error : unknown){
    if (error instanceof Error && error?.message === "NEXT_REDIRECT") {
      throw error;
    }
    return {
      success: false,
      message: "Something went wrong! Please try again later.",
    };
  }
}