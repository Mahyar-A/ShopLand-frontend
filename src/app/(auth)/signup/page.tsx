import Image from "next/image";
import NextLink from "next/link";
import { Button, Link } from "@nextui-org/react";
import { FingerprintIcon } from "lucide-react";
import SignupForm from "./_components/signup-form";

export default function SignupPage() {
  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
      <div className="p-2">
        <div className="hidden lg:block relative h-full rounded-xl overflow-hidden after:absolute after:inset-0 after:bg-black/30">
          <Image
            src="/images/person-holding-bank-card.jpg"
            alt="Person Holding a Bank Card"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col p-8">
        <Button as={NextLink} href="/" variant="light" className="self-end">
          Home
        </Button>
        <div className="flex flex-col items-center justify-center p-10 h-full my-auto">
          <div className="w-full sm:w-[420px]">
            <div className="mb-10">
              <FingerprintIcon className="mb-4 text-primary" />
              <h1 className="font-bold text-3xl mb-2">
                Shop<span className="text-primary">Land</span>
              </h1>
              <p>
                Already have an account?{" "}
                <Link as={NextLink} href="/login">
                  Log in
                </Link>
              </p>
            </div>

            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
