// src/constants/card-labels.ts
export type LabelGroup =
  | "notification"
  | "unplanned-outage"
  | "energized-outage"
  | "default";

type LabelMap = Record<string, string>;

export const CARD_LABELS: Record<LabelGroup, LabelMap> = {
  notification: {
    scada: "SCADA",
    osos: "OSOS",
    crm: "CRM",
    crm_tesisatli: "CRM - Tesisatlı",
    crm_tesisatsiz: "CRM - Tesisatsız",
  },
  "unplanned-outage": {
    dagitimAG: "AG",
    dagitimOG: "OG",
    iletim: "İletim",
  },
  "energized-outage": {
    dagitimAG: "AG",
    dagitimOG: "OG",
    iletim: "İletim",
  },
  default: {},
};
