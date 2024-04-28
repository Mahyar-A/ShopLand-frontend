import { login } from "@/api/services/auth";
import { AuthTokenType, LoginType } from "@/api/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useLoginMutation() {
  return useMutation<AuthTokenType, AxiosError<{ Message: string }>, LoginType>({
    mutationKey: ["login"],
    mutationFn: login,
  });
}
