import { evidenceApiConfig } from '../config'

import type {
  ReportedEvidenceRow,
  SubmissionsByActivityDataPoint,
} from '../../domain'

export type GetEvidencesParams = {
  page?: number
  limit?: number
  transactionId?: string
  classification?: string
}

export type GetEvidencesResult = {
  data: ReportedEvidenceRow[]
  totalCount: number
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
  return `${evidenceApiConfig.endpoints.evidences}?${search.toString()}`
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
  return fetchJson<SubmissionsByActivityDataPoint[]>(
    evidenceApiConfig.endpoints.activities
  )
}
