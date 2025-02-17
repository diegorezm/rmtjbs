import { api } from "~/lib/axios";
import type { DeleteObjectDTO } from "./types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// WARNING: This code should NOT be used in production 
// it's not secure at all

type UploadFileResponse = { error?: null, message: string } | { error: string, message?: null }

export const uploadFile = async (file: File, objectKey: string): Promise<UploadFileResponse> => {
  const validation = validateFile(file)

  if (validation !== null) {
    return validation
  }

  const formData = new FormData()
  formData.append("file", file);
  formData.append("objectKey", objectKey);

  try {
    await api.post("/storage/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
    return { error: null, message: "File uploaded successfully." };
  } catch (error: any) {
    return { error: "Failed to upload the file. Please try again." };
  }
};

export const useDeleteFileMutation = () => useMutation<null, Error, DeleteObjectDTO>(async (data) => {
  await api.post("/storage/delete", data)
  return null;
})

const validateFile = (file: File) => {
  if (!file.type.startsWith("image") && file.type !== "application/pdf") {
    return { error: "This filetype is not supported. Please only upload images or PDFs." };
  }

  const maxSizeInMB = 1 * 1024 * 1024; // 1 MB
  if (file.size > maxSizeInMB) {
    return { error: "The file size should be under 1 MB." };
  }
  return null
}

