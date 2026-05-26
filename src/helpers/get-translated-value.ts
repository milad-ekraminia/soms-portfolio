import { TFunction } from "i18next";
import { ReactNode } from "react";

export function getTranslatedValue(
  value: string | number | boolean | null | undefined | ReactNode,
  t: TFunction
): ReactNode {
  if (typeof value === "string" || typeof value === "number") {
    const translated = t(value.toString());
    return translated !== value ? translated : value;
  }

  return value;
}
