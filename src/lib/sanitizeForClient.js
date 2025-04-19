export function sanitizeForClient(data) {
  return JSON.parse(JSON.stringify(data));
}
