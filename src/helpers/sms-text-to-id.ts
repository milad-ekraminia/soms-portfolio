import { placeholderMap } from "./data/settings";

export const convertTextToApiFormat = (text: string) => {
  let result = text;

  // Replace all placeholders with {ID}
  Object.entries(placeholderMap).forEach(([label, id]) => {
    const regex = new RegExp(`\\${label}`, "g"); // escape special chars
    result = result.replace(regex, `{${id}}`);
  });

  return result;
};
