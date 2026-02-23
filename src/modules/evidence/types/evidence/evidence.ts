export const EvidenceSource = {
  Form: 'form',
  Csv: 'csv',
  Api: 'api',
  Antifraud: 'antifraud',
} as const

export type EvidenceSource =
  (typeof EvidenceSource)[keyof typeof EvidenceSource]

export const EvidenceClassification = {
  FraudAttempt: 'fraudAttempt',
  FraudOccurrence: 'fraudOccurrence',
} as const

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

/** Registro de evidência como retornado pela API (pode incluir campos usados na duplicidade) */
export type EvidenceRecord = ReportedEvidenceRow & {
  transactionValue?: string
}
