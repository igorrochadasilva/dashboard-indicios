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
