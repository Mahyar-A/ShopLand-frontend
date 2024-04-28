import { getCurrentUser } from "@/api/services/user";
import { UserType } from "@/api/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCurrentUser() {
  return useQuery<UserType, AxiosError, UserType, string[]>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });
}
