export function getUrl(path: string) {
  return `${process.env.REACT_APP_REQUEST_URL}${path}`;
}
