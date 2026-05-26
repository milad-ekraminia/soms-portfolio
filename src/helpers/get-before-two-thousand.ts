export function isBefore2000(dateStr: string): boolean|string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return '-';
  }
  return d.getUTCFullYear() < 2000;
}
