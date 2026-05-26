import * as yup from "yup";

export const createRankAddressSchema = yup.object().shape({
  city: yup.string().required("İl zorunludur"),
  district: yup.string().required("İlçe zorunludur"),
  neighborhood: yup.string().required("Mahalle zorunludur"),
  stationId: yup
    .mixed<string | number>()
    .transform((value) => (value === "" ? undefined : value))
    .required("İstasyon zorunludur"),
  cbsId: yup.string().required("CBS ID zorunludur"),
});

export const createRankCbsSchema = yup.object({
  cbsId: yup.string().required("CBS ID zorunludur"),
  city: yup.string().optional(),
  district: yup.string().optional(),
  neighborhood: yup.string().optional(),
  stationId: yup
    .mixed<string | number>()
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
});
export type CreateRankAddressFormValues = yup.InferType<
  typeof createRankAddressSchema
>;
export type CreateRankCBSFormValues = yup.InferType<typeof createRankCbsSchema>;
export type CreateRankDrawerFormValues =
  | CreateRankAddressFormValues
  | CreateRankCBSFormValues;
export type RankDrawerFormValues =
  | CreateRankCBSFormValues
  | CreateRankAddressFormValues;
