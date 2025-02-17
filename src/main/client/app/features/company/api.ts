import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CompanyDTO } from "./types";
import { api } from "~/lib/axios";

export const useUpdateCompanyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<null, Error, CompanyDTO>(async (data) => {
    const response = await api.put("/company", data)
    return response.data
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"])
    }
  }
  )
}
