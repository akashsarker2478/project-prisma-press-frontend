"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const logoutAction = async()=>{
    try {
        const cookieStore = await cookies();
        cookieStore.delete("accessToken")
        cookieStore.delete("refreshToken")
        revalidatePath("/", "layout");
    } catch (error:unknown) {
        if(error instanceof Error && error.message === "NEXT_REDIRECT"){
            throw error
        }
    }
    redirect("/login")
}