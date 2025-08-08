export function parseNumber(value) {
  const n = parseFloat(String(value).replace(',', '.'))
  return isNaN(n) ? null : n
}
