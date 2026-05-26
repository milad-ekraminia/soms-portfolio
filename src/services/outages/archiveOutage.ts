import {  getFormDataPost } from "@/lib/api-method/api-method-functions";

export async function postArchiveOutages({ list }: { list: any }) {
  return await getFormDataPost({
    endPoint: `archive-outages`,
    type: "post",
    formData: [...list],
  });
}