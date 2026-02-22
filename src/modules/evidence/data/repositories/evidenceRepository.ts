import { evidenceApiConfig } from '../config'

import type {
  ReportedEvidenceRow,
  SubmissionsByActivityDataPoint,
} from '../../domain'

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json() as Promise<T>
}

export async function getEvidences(): Promise<ReportedEvidenceRow[]> {
  return fetchJson<ReportedEvidenceRow[]>(evidenceApiConfig.endpoints.evidences)
}

export async function getActivities(): Promise<
  SubmissionsByActivityDataPoint[]
> {
  return fetchJson<SubmissionsByActivityDataPoint[]>(
    evidenceApiConfig.endpoints.activities
  )
}
