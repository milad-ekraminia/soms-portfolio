import * as yup from "yup";

export const createUnplannedOutageSchema = yup.object().shape({
  city: yup.string().required("İl zorunludur"),
  district: yup.string().required("İlçe zorunludur"),
  neighborhood: yup.string().required("Mahalle zorunludur"),
  stationId: yup
    .mixed<string | number>()
    .transform((value) => (value === "" ? undefined : value))
    .required("İstasyon zorunludur"),
  cbsId: yup.string().required("CBS ID zorunludur"),
  complaint: yup.string().required("Şikayet türü zorunludur"),
  importance: yup.string().required("Önem derecesi zorunludur"),
  description: yup.string().optional(),
});

export const cbsSchema = yup.object({
  cbsId: yup.string().required("CBS ID zorunludur"),
  complaint: yup.string().required("Şikayet türü zorunludur"),
  importance: yup.string().required("Önem derecesi zorunludur"),
  description: yup.string().optional(),
});
export type AddressFormValues = yup.InferType<
  typeof createUnplannedOutageSchema
>;
export type CBSFormValues = yup.InferType<typeof cbsSchema>;
export type DrawerFormValues = AddressFormValues | CBSFormValues;
export const plannedOutageSchema = yup.object().shape({
  city: yup.string().optional(),
  district: yup.string().optional(),
  neighborhood: yup.string().optional(),
  stationId: yup.mixed<string | number>().optional(),
  cbsId: yup.string().required("CBS ID zorunludur"),
  reason: yup.string().required("Kesinti nedenini zorunludur"),
  description: yup.string().optional(),
  startDateTime: yup.string().required("Planlanan Başlangıç Zamanı zorunludur"),
  endDateTime: yup.string().required("Planlanan Bitiş Zamanı zorunludur"),
});

export const stageSchema = yup.object().shape({
  city: yup.string().required("İl zorunludur"),
  district: yup.string().required("İlçe zorunludur"),
  neighborhood: yup.string().required("Mahalle zorunludur"),
  stationId: yup
    .mixed<string | number>()
    .transform((value) => (value === "" ? undefined : value))
    .required("İstasyon zorunludur"),
  cbsId: yup.string().required("CBS ID zorunludur"),
  reason: yup.string().required("Kesinti nedeni zorunludur"),
  description: yup.string().optional(),
  startDateTime: yup.string().required("Planlanan Başlangıç Zamanı zorunludur"),
  endDateTime: yup.string().required("Planlanan Bitiş Zamanı zorunludur"),
});

export const ompSchema = yup.object({
  cbsId: yup.string().required("CBS ID zorunludur"),
  reason: yup.string().required("Kesinti nedeni zorunludur"),
  description: yup.string().optional(),
  startDateTime: yup.string().required("Planlanan Başlangıç Zamanı zorunludur"),
  endDateTime: yup.string().required("Planlanan Bitiş Zamanı zorunludur"),
});
export const plannedOutageFormSchema = yup.object({
  stages: yup
    .array()
    .of(stageSchema)
    .min(1, "En az bir aşama eklenmelidir")
    .required("Aşamalar zorunludur"),
  cbsId: yup.string().required("CBS ID zorunludur"),
  reason: yup.string().required("Kesinti nedeni zorunludur"),
  description: yup.string().optional(),
  startDateTime: yup.string().required("Planlanan Başlangıç Zamanı zorunludur"),
  endDateTime: yup.string().required("Planlanan Bitiş Zamanı zorunludur"),
});
