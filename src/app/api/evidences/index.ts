import type {
  CreateEvidencePayload,
  EvidenceRecord,
  GetEvidencesParams,
  GetEvidencesResult,
  ReportedEvidenceRow,
} from '@/modules/evidence/types'

import { endpoints } from '../config'

import { formatOccurrenceDateForApi, toCanonicalDate } from './dateUtils'

export { formatOccurrenceDateForApi } from './dateUtils'

type EvidencesApiResponse =
  | ReportedEvidenceRow[]
  | {
      data: ReportedEvidenceRow[]
      items?: number
      first?: number
      last?: number
      pages?: number
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
