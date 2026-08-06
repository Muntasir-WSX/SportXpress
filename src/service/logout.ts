"use server"


import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookieStore = await cookies();
  
  // সঠিক বানান দিয়ে কুঁকি ডিলিট করা হলো
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  revalidateTag("My profile","max");

  return { success: true, message: "Logged out successfully!" };
}