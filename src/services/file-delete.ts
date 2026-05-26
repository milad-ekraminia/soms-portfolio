import { getFormDataPost } from "@/lib/api-method/api-method-functions";

export const PostFileDelete = async (fileId: number) => {
  return await getFormDataPost({
    endPoint: `delete-file/${fileId}`,
    type: "post",
    formData: {},
  });
};
