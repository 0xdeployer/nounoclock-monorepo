export function truncateAddress(address: string) {
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 4
  )}`;
}
