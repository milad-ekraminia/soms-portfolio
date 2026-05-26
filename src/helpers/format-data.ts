export const dateFormater = (date: string) => {
  const currentLanguage = "tr";

  if (typeof date !== "string" || !date) return "";

  // If the milliseconds part is too long, trim it to the first 3 digits
  const fixedDateStr = date.replace(/(\.\d{3})\d+/, "$1");

  const parsedDate = new Date(fixedDateStr);
  const year = parsedDate.getFullYear();

  if (isNaN(parsedDate.getTime()) || year < 2000) return "-";

  return new Intl.DateTimeFormat(currentLanguage === "tr" ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(parsedDate);
};
