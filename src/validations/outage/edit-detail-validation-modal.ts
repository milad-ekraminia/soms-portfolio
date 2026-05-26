import * as yup from "yup";

export const editDetailOutageSchema = yup.object().shape({
  city: yup.string().required(),
  district: yup.string().required(),
  neighborhood: yup.string().required(),
  stationId: yup.mixed<string | number>().required(),
  cbsId: yup.string().required("CBS ID zorunludur"),
});
