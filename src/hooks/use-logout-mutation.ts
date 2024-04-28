import { logout } from "@/api/services/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/api/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async (data: string) => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      logout(data);
    },
    onSettled() {
      queryClient.resetQueries({ queryKey: ["user"], exact: true });
      queryClient.removeQueries();
    },
  });
}
