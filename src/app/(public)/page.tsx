import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";
import Image from "next/image";
import Link from "next/link";


export default async function HomePage() {

const user = await getMe();
console.log("User Data:", user);
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">Welcome to RentNest Property</h1>
        <p className="text-lg mb-8">The fastest growing property rental platform.</p>
        <div className="flex space-x-4">
          <Link href="/(auth)/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/(auth)/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
