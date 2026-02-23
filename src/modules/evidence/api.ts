import type {
  CreateEvidencePayload,
  EvidenceRecord,
  GetEvidencesParams,
  GetEvidencesResult,
  ReportedEvidenceRow,
  SubmissionsByActivityDataPoint,
} from './types'

/** Erro lançado quando já existe indício com mesma data e valor (duplicata). */
export class DuplicateEvidenceError extends Error {
  constructor() {
    super('Já existe indício com mesma data e valor da transação.')
    this.name = 'DuplicateEvidenceError'
  }
}

const BASE = 'http://localhost:3001'

const endpoints = {
  evidences: `${BASE}/evidences`,
  activities: `${BASE}/activities`,
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json() as Promise<T>
}

function buildEvidencesUrl(params: GetEvidencesParams): string {
  const search = new URLSearchParams()
  const page = params.page ?? 1
  const perPage = params.limit ?? 10
  search.set('_page', String(page))
  search.set('_per_page', String(perPage))
  if (params.transactionId?.trim()) {
    search.set('transactionId', params.transactionId.trim())
  }
  if (params.classification?.trim()) {
    search.set('classification', params.classification.trim())
  }
  return `${endpoints.evidences}?${search.toString()}`
}

type EvidencesApiResponse =
  | ReportedEvidenceRow[]
  | {
      data: ReportedEvidenceRow[]
      items?: number
      first?: number
      last?: number
      pages?: number
    }

export async function getEvidences(
  params: GetEvidencesParams = {}
): Promise<GetEvidencesResult> {
  const url = buildEvidencesUrl(params)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  const json = (await res.json()) as EvidencesApiResponse

  if (Array.isArray(json)) {
    const totalCount = Number(res.headers.get('X-Total-Count')) || json.length
    return { data: json, totalCount }
  }

  const data = json.data ?? []
  const totalCount = json.items ?? data.length
  return { data, totalCount }
}

export async function getActivities(): Promise<
  SubmissionsByActivityDataPoint[]
> {
  return fetchJson<SubmissionsByActivityDataPoint[]>(endpoints.activities)
}

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
function toCanonicalDate(occurrenceDateStr: string): string {
  const s = (occurrenceDateStr ?? '').trim()
  if (!s) return ''
  const withoutSeconds = s.replace(/:(\d{2})$/, '')
  const withoutAux = withoutSeconds.replace(/\s*às\s*/i, ' ')
  return withoutAux.trim()
}

/**
 * Verifica se já existe indício com mesma data/hora da ocorrência e valor da transação.
 * Usa getEvidences (mesmo contrato da listagem) e compara no cliente; um match já indica duplicata.
 */
export async function checkDuplicateEvidence(
  occurrenceDateTime: string,
  transactionValue: string
): Promise<boolean> {
  const formattedApi = formatOccurrenceDateForApi(occurrenceDateTime)
  const canonicalDate = toCanonicalDate(formattedApi)
  const normalizedValue = String(transactionValue ?? '').trim()

  const { data } = await getEvidences({ page: 1, limit: 1000 })
  const list = data as EvidenceRecord[]

  return list.some((item) => {
    const itemDate = toCanonicalDate(item.occurrenceDate ?? '')
    const itemValue = String(item.transactionValue ?? '').trim()
    return itemDate === canonicalDate && itemValue === normalizedValue
  })
}

/**
 * Cria um novo indício.
 */
export async function createEvidence(
  payload: CreateEvidencePayload
): Promise<EvidenceRecord> {
  const res = await fetch(endpoints.evidences, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      source: payload.source ?? 'form',
      transactionId: `gen-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      executorName: (payload as { executorName?: string }).executorName ?? '',
      executorDocument:
        (payload as { executorDocument?: string }).executorDocument ?? '',
    }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json() as Promise<EvidenceRecord>
}
