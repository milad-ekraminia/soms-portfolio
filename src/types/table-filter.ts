export type TableFilter = {
  key: string;
  value: string | number | null | { start?: string; end?: string };
  filterType: string;
};
