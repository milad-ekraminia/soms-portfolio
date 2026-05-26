import { getData } from "@/lib/api-method/api-method-functions";

export async function postEnergizeInterruption({
  outageId,
  formData,
}: {
  outageId: number;
  formData: any;
}) {
  return await getData({
    endPoint: `energize-the-interruption/${outageId}`,
    type: "post",
    dataParams:  formData ,
  });
}