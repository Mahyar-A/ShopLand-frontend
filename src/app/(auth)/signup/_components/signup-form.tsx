"use client";

import { Button, Input } from "@nextui-org/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutation } from "../_hooks/use-signup-mutation";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, XIcon } from "lucide-react";

const FormSchema = z
  .object({
    firstName: z.string().min(1, "Firstname is required"),
    lastName: z.string().min(1, "Lastname is required"),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .max(15, "Password should not be more than 15 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Confirm Password should match the Password",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" },
  });
  const router = useRouter();
  const { mutate: signupMutation, error, reset: resetMutation, isPending } = useSignupMutation();

  async function onSubmit(formData: FormSchemaType) {
    signupMutation(formData, {
      onSuccess() {
        resetForm();
        router.push("/login");
      },
    });
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <Button
            color="danger"
            variant="light"
            size="sm"
            isIconOnly
            className="absolute right-0 top-0 !bg-transparent"
            onClick={resetMutation}
          >
            <XIcon className="h-4 w-4" />
          </Button>
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="text-sm">{error.response?.data.Message}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <fieldset className="flex gap-4">
          <Input
            label="Firstname"
            variant="bordered"
            placeholder="Enter your firstname"
            isInvalid={!!errors.firstName}
            errorMessage={errors.firstName?.message}
            isClearable
            {...register("firstName")}
          />
          <Input
            label="Lastname"
            variant="bordered"
            placeholder="Enter your lastname"
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName?.message}
            isClearable
            {...register("lastName")}
          />
        </fieldset>
        <Input
          type="email"
          label="Email"
          variant="bordered"
          placeholder="Enter your email"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          isClearable
          {...register("email")}
        />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          type="password"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          isClearable
          {...register("password")}
        />
        <Input
          label="Confirm Password"
          variant="bordered"
          placeholder="Confirm your password"
          type="password"
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          isClearable
          {...register("confirmPassword")}
        />
        <Button color="primary" type="submit" isLoading={isSubmitting || isPending}>
          Signup
        </Button>
      </form>
    </div>
  );
}
