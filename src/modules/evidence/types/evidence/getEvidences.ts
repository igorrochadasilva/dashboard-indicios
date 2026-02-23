import type { ReportedEvidenceRow } from './evidence'

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
