export const getTodayRange = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const startOfDay = `${year}-${month}-${day} 00:00:00`;
  const endOfDay = `${year}-${month}-${day} 23:59:59`;

  return { startOfDay, endOfDay };
};
