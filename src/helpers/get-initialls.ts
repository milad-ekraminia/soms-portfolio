export const getInitials = (fullName?: string) => {
  if (!fullName) return "";
  const words = fullName.trim().split(/\s+/);
  const first = words[0]?.charAt(0)?.toUpperCase() ?? "";
  const second =
    words.length > 1 ? words[words.length - 1]?.charAt(0)?.toUpperCase() : "";
  return `${first}${second}`;
};
