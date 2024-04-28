import { signup } from "@/api/services/auth";
import { SignupType } from "@/api/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useSignupMutation() {
  return useMutation<unknown, AxiosError<{ Message: string }>, SignupType>({
    mutationKey: ["signup"],
    mutationFn: signup,
  });
}
