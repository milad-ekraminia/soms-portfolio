import {  getFormDataPost } from "@/lib/api-method/api-method-functions";

interface OutageParams {
  list: number[];
  description?: string;
  status: number;
}
export async function PostOutagesCancellation({list, description, status}: OutageParams) {
  return await getFormDataPost({
    endPoint: `outages-cancellation?description=${description}&status=${status}`,
    type: "post",
    formData: [...list],
  });
}
export async function PostPlannedAwaitingOutagesCancellation({
  list,
  description,
  status,
}: OutageParams) {
  return await getFormDataPost({
    endPoint: `planned-outage-canceled?description=${description}&status=${status}`,
    type: "post",
    formData: [...list],
  });
}
