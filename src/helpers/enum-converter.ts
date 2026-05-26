type Option = {
    id: number | string;
    value: number | string;
    displayName: string; // this will be the translation key
  };
  
  export function enumToOptions(
    enumObject: Record<string, number | string>,
    filterFn: (key: string, value: number | string) => boolean = (_, value) =>
      typeof value === "number",
    formatFn: (key: string) => string = defaultFormatKey
  ): Option[] {
    return Object.entries(enumObject)
      .filter(([key, value]) => filterFn(key, value))
      .map(([key, value]) => ({
        id: value,
        value: value,
        displayName: formatFn(key), // stays translation-safe
      }));
  }
  
  function defaultFormatKey(key: string): string {
    // Keep the enum key untouched for translation lookup
    return key;
  }
  