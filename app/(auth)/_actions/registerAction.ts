"use server"

import { FormState } from "./loginAction";

export const registerAction =async (prevState:FormState ,formData:FormData):Promise<FormState>=>{
    const name  = formData.get("name")as string;
    const email = formData.get("email")as string;
    const password= formData.get("password")as string;

    //static image url hardcoded
    const profilePhoto = "https://www.google.com";

    const payload = {
    name,
    email,
    password,
    profilePhoto
}
try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`,{
    method:"POST",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify(payload)
});
const result = await res.json()

if(!res.ok){
    return{
        success:false,
        message:result.message || "Registration failed!"
    }
}

 return{
        success:true,
        message: "Registration successful!",
        data:result
    }
} catch  {
    return {
      success: false,
      message: "Something went wrong! Please try again later.",
    };
}
}
