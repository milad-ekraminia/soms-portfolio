import * as yup from "yup";

export const loginInitialValues = {
  username: undefined,
  password: undefined,
};

export const loginResolver = yup.object({
  username: yup.string().required("user name required"),
  password: yup
    .string()
    .required(
    'password required'
    ),
});

export type loginInitialValuesTypes = yup.InferType<typeof loginResolver>;
