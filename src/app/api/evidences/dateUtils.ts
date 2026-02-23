/**
 * Formata "YYYY-MM-DDTHH:mm" (datetime-local) para "DD/MM/YYYY às HH:mm:00".
 */
export function formatOccurrenceDateForApi(occurrenceDateTime: string): string {
  if (!occurrenceDateTime) return ''
  const d = new Date(occurrenceDateTime)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year} às ${hours}:${minutes}:00`
}

/**
 * Reduz data ao formato canônico "DD/MM/YYYY HH:mm" para comparação (evita problema de encoding "às" e segundos).
 */
export function toCanonicalDate(occurrenceDateStr: string): string {
  const s = (occurrenceDateStr ?? '').trim()
  if (!s) return ''
  const withoutSeconds = s.replace(/:(\d{2})$/, '')
  const withoutAux = withoutSeconds.replace(/\s*às\s*/i, ' ')
  return withoutAux.trim()
}
