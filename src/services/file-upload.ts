import { getFormDataPost } from "@/lib/api-method/api-method-functions";

export const PostFileUpload = async (fileId: number, formData: any) => {
  return await getFormDataPost({
    endPoint: `upload-file/${fileId}`,
    type: "post",
    formData,
  });
};
