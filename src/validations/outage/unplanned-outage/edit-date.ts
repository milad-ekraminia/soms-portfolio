import * as yup from "yup";

export const editDateSchema = yup
  .object({
    startDateTime: yup.string(),
    endDateTime: yup.string(),
    description: yup.string(),
  })
  .partial(); // ✅ THIS IS THE IMPORTANT PART
