import { getFormDataPost } from "@/lib/api-method/api-method-functions";

export const PostFileDownload = async (fileId: number) => {
  return await getFormDataPost({
    endPoint: `download-file/${fileId}`,
    type: "post",
    formData: {},
  });
};
