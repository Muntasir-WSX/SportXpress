"use server"


type LoginState = {
    success: true,
    "message": "Login successful",
    statuscode: number,
    data:{
        accessToken: string,
        refreshToken: string,
    }
    }


export const loginAction = async (prevState: LoginState, formData: FormData) => {
console.log("Form Data Received:", formData);

const email = formData.get("email") as string;
const password = formData.get("password") as string;

console.log("Email:", email);
console.log("Password:", password);

const payload = {
    email,
    password,
}

const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({...payload })});

    const result = await response.json();
    console.log("Login Response Result:", result);

    return result;

    


}