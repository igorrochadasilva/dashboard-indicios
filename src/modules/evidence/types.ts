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

/** Registro de evidência como retornado pela API (pode incluir campos usados na duplicidade) */
export type EvidenceRecord = ReportedEvidenceRow & {
  transactionValue?: string
}

/** Payload para criação de indício (campos do formulário mapeados para a API) */
export type CreateEvidencePayload = {
  occurrenceDate: string
  transactionValue: string
  occurrenceChannel?: string
  institutionCnpj?: string
  institutionName?: string
  relatedActivity?: string
  classification?: string
  reason?: string
  contractValue?: string
  typableLine?: string
  occurrencePlace?: string
  source?: string
}
