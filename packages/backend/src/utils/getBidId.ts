export function getBidId(nounId: string, sender: string, value: string) {
  return `${nounId}-${sender}-${value}`.toLowerCase();
}
