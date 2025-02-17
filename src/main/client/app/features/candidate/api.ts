import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CandidateDTO } from "./types";
import { api } from "~/lib/axios";

export const useUpdateCandidateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<null, Error, CandidateDTO>(async (data) => {
    await api.put("/candidates", data)
    return null
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"])
    }

  })
}
