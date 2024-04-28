"use client";

import NextLink from "next/link";
import { Input, Button, Link } from "@nextui-org/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../_hooks/use-login-mutation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/api/utils";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, "Password is reqiured"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();
  const { mutate: loginMutation, error, reset: resetMutation, isPending } = useLoginMutation();

  async function onSubmit(formData: FormSchemaType) {
    loginMutation(formData, {
      onSuccess(data) {
        localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

        resetForm();
        router.push("/");
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
        <Input
          isClearable
          type="email"
          label="Email"
          variant="bordered"
          placeholder="Enter your email"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <fieldset className="space-y-2">
          <Input
            isClearable
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            type="password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            {...register("password")}
          />
          <Link as={NextLink} href="#" className="text-xs">
            Forgotten password?
          </Link>
        </fieldset>
        <Button color="primary" type="submit" isLoading={isSubmitting || isPending}>
          Login
        </Button>
      </form>
    </div>
  );
}
