import { PostFileUpload } from "@/services/post-file-upload";
import { useMutation } from "@tanstack/react-query";

export const useFileUpload = () => {
  return useMutation({
    mutationFn: ({ fileId, formData }: { fileId: number; formData: any }) =>
      PostFileUpload(fileId, formData),
  });
};
