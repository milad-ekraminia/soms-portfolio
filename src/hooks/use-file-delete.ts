import { deleteFile } from "@/services/delete-file";
import { useMutation } from "@tanstack/react-query";

export const useFileDelete = () => {

  return useMutation({
    mutationFn: ({ fileId }: { fileId: number }) => deleteFile(fileId),
  });
};
