export const tableFilterOptions = [
  { displayName: "Eşittir", value: "equals", id: "equals" },
  { displayName: "İçerir", value: "like", id: "like" },
  { displayName: "İle Başlar", value: "startsWith", id: "startsWith" },
  { displayName: "İle Biter", value: "endsWith", id: "endsWith" },
  { displayName: "Eşit Değildir", value: "notEquals", id: "notEquals" },
  { displayName: "Daha Büyük", value: "greaterThan", id: "greaterThan" },
  {
    displayName: "Büyük veya Eşittir",
    value: "greaterThanOrEquals",
    id: "greaterThanOrEquals",
  },
  { displayName: "Daha Küçük", value: "lesserThan", id: "lesserThan" },
  {
    displayName: "Küçük veya Eşittir",
    value: "lesserThanOrEquals",
    id: "lesserThanOrEquals",
  },
  { displayName: "Boş", value: "isNull", id: "isNull" },
  { displayName: "Dolu", value: "isNotNull", id: "isNotNull" },
];
