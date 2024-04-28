import Image from "next/image";
import NextLink from "next/link";
import { Button, Link } from "@nextui-org/react";
import { LogInIcon } from "lucide-react";
import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
      <div className="p-8 flex flex-col">
        <Button as={NextLink} href="/" variant="light" className="self-start">
          Home
        </Button>
        <div className="flex flex-col items-center justify-center p-10 my-auto">
          <div className="w-full sm:w-[420px]">
            <div className="mb-10">
              <LogInIcon className="mb-4 text-primary" />
              <h1 className="font-bold text-3xl mb-2">
                Shop<span className="text-primary">Land</span>
              </h1>
              <p>
                Don't have an account?{" "}
                <Link as={NextLink} href="/signup">
                  Sign up
                </Link>
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="hidden lg:block relative h-full rounded-xl overflow-hidden after:absolute after:inset-0 after:bg-black/30">
          <Image
            src="/images/shopping-cart-on-macbook.jpg"
            alt="Shopping Cart on a Macbook"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
