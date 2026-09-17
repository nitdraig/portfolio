/**
 * Normalize a polished idea pitch so product names use double quotes:
 * Explorador, te propongo "RutaLocal": ...
 */
export function formatPitchQuotes(text: string): string {
  return String(text)
    .replace(/[\u2018\u2019\u00B4]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/(te propongo|I propose)\s+'([^']+)'/gi, '$1 "$2"')
    .replace(/'([A-Za-zÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑ0-9-]{1,40})'/g, '"$1"');
}
