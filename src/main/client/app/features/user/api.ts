import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/axios";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<null, Error, { name: string }>(async (data) => {
    await api.put("/user", data)
    return null
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"])
    }
  })
}
