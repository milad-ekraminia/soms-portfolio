import { placeholderMap } from "./data/settings";

// reverse map: number → label
export const idToPlaceholder: Record<number, string> = Object.fromEntries(
  Object.entries(placeholderMap).map(([label, id]) => [id, label])
);

// 🔄 Backend → UI: numbers → labels
export const convertIdsToPlaceholders = (text: string): string => {
  let newText = text;
  for (const [id, label] of Object.entries(idToPlaceholder)) {
    newText = newText?.replace(new RegExp(`\\{${id}\\}`, "g"), label);
  }
  return newText;
};

// 🔄 UI → Backend: labels → numbers
export const convertPlaceholdersToIds = (text: string): string => {
  let newText = text;
  for (const [label, id] of Object.entries(placeholderMap)) {
    newText = newText.replace(
      new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      `{${id}}`
    );
  }
  return newText;
};
const smsValues: Record<string, string> = {
  İl: "Diyarbakır",
  İlçe: "Bağlar",
  Mahalle: "Bağcılar",
  "Planlı Başlangıç Tarihi": "01.01.2030 14:00:00",
  "Planlı Bitiş Tarihi": "01.01.2030 18:00:00",
  "Tahmini Enerji Veriliş Saati": "15.02.2030 12:30:00",
  "Tesisat Numarası": "123456",
  "Abone Numarası": "654321",
  "Planlı Kesinti Nedeni": "Planlı bakım çalışması",
  "Plansız Başlangıç Tarihi": "01.01.2030 14:00:00",
  "Plansız Bitiş Tarihi": "01.01.2030 18:00:00",
  "Plansız Kesinti Nedeni": "Müteahhit çalışması",
};
export function replacePlaceholders(template: string) {
  return template?.replace(/\{([^}]+)\}/g, (_, key) => {
    const cleanKey = key.trim();
    return smsValues[cleanKey] ?? `{${cleanKey}}`;
  });
}
