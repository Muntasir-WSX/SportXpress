import Image from "next/image";
import Link from "next/link";
import Likebutton from "./ui/likebutton";

export default function Home() {
  return (
    <div>
      Hello SportsFans

      Blog Page <Link href={"/blogs"}>Blogs</Link>
    
     <Likebutton></Likebutton>
    
    </div>
  );
}
