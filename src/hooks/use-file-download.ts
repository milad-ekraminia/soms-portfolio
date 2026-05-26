import { PostFileDownload } from "@/services/post-file-download";
import { useMutation } from "@tanstack/react-query";

export const useFileDownload = () => {

  return useMutation({
    mutationFn: (fileId: number) => PostFileDownload(fileId),
  
  });
};
