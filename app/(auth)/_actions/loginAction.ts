"use server"
export type FormState={
    success: boolean;
    message: string;
    data?: unknown;
} | null;

export const loginAction = async(prevState : FormState ,formData : FormData)=>{
    // console.log(formData);
    const email = formData.get("email")
    const password = formData.get("password")
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

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Login failed. Invalid credentials!",
      };
    }

    return {
      success: true,
      message: "Login successful!",
      data: result,
    };
  } catch{
    return {
      success: false,
      message: "Something went wrong! Please try again later.",
    };
  }
}