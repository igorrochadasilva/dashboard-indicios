export const EvidenceSource = {
  Form: 'form',
  Csv: 'csv',
  Api: 'api',
  Antifraud: 'antifraud',
}

export type EvidenceSource =
  (typeof EvidenceSource)[keyof typeof EvidenceSource]

export const EvidenceClassification = {
  FraudAttempt: 'fraudAttempt',
  FraudOccurrence: 'fraudOccurrence',
}

export type EvidenceClassification =
  (typeof EvidenceClassification)[keyof typeof EvidenceClassification]

export type ReportedEvidenceRow = {
  id: string
  transactionId: string
  source: EvidenceSource
  classification: EvidenceClassification
  executorName: string
  executorDocument: string
  occurrenceDate: string
}

export type SubmissionsByActivityDataPoint = {
  date: string
  aberturaConta?: number
  contratacaoCredito?: number
  manutencaoConta?: number
  pagamento?: number
  pix?: number
  saque?: number
  transferencia?: number
}

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
