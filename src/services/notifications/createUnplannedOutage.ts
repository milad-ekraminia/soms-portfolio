import {
  getData,
  getFormDataPost,
} from "@/lib/api-method/api-method-functions";

interface OutageParams {
  dataParams: {
    notificationIds?: number[];
    cbsId: string;
    subjectType: number;
    priorityType: number;
    description?: string;
  };
}

export async function PostUnplannedOutageFromExistingNotifications({
  dataParams,
}: OutageParams) {
  const {
    notificationIds,
    cbsId,
    subjectType,
    priorityType,
    description = "",
  } = dataParams;

  const queryParams = new URLSearchParams({
    cbsId,
    subjectType: String(subjectType),
    priorityType: String(priorityType),
    description,
  }).toString();

  return await getFormDataPost({
    endPoint: `outage-from-existing-notifications?${queryParams}`,
    type: "post",
    formData: [...(notificationIds ?? [])],
  });
}

export async function PostCreateUnplannedOutage({ dataParams }: OutageParams) {
  const { cbsId } = dataParams;
  return await getData({
    endPoint: `manual-notification/${cbsId}`,
    type: "post",
    dataParams,
  });
}
export async function PostCreatePlannedOutage({ dataParams }: OutageParams) {
  const { cbsId } = dataParams;
  return await getData({
    endPoint: `planned-outage/${cbsId}`,
    type: "post",
    dataParams,
  });
}
