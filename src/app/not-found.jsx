import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-extrabold ">404</h1>
      <p className="mt-4 ">Oops! Page not found.</p>
      <Link href="/">
        <Button className="mt-6">Go Back to Home</Button>
      </Link>
    </div>
  );
}
