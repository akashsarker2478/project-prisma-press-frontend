"use server"
import { cookies } from "next/headers";

export const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = await cookieStore.get("accessToken")?.value;
    if (!accessToken) {
      return {
        success: false,
        message:"user not logged in",
        data: null,
      };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

      if (!res.ok) {
      return {
        success: false,
        data: null,
      };
    }

    const result = await res.json();
    return result;
  } catch (error:unknown) {
   if(error instanceof Error){
    console.error("Failed to fetch user:", error.message);
   }else{
    console.error("An unexpected error occurred:", error);
   }
   return{success : false, data:null}
  }
};
