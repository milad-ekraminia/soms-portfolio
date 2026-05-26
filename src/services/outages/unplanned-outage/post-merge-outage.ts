import {  getFormDataPost } from "@/lib/api-method/api-method-functions";

export async function postCheckMergeOutage({ list }: { list: any }) {
  return await getFormDataPost({
    endPoint: `check-manually-merge-outages`,
    type: "post",
    formData: [...list],
  });
}
export async function postMergeOutage({ list }: { list: any }) {
  return await getFormDataPost({
    endPoint: `manually-merge-outages`,
    type: "post",
    formData: [...list],
  });
}