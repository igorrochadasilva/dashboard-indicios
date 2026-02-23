import { formatOccurrenceDateForApi } from '@/app/api'

import type { CreateEvidenceFormValues } from '../schema'
import type { CreateEvidencePayload } from '../types'

export function buildCreatePayload(
  data: CreateEvidenceFormValues
): CreateEvidencePayload {
  return {
    occurrenceDate: formatOccurrenceDateForApi(data.occurrenceDateTime),
    transactionValue: data.transactionValue ?? '',
    occurrenceChannel: data.occurrenceChannel,
    institutionCnpj: data.institutionCnpj,
    institutionName: data.institutionName,
    relatedActivity: data.relatedActivity,
    classification: data.classification,
    reason: data.reason,
    contractValue: data.contractValue,
    typableLine: data.typableLine,
    occurrencePlace: data.occurrencePlace,
  }
}
