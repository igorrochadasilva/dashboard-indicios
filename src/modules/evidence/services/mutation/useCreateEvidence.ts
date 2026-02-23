import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  checkDuplicateEvidence,
  createEvidence,
  DuplicateEvidenceError,
} from '@/app/api'

import { buildCreatePayload } from '../../utils'
import { EVIDENCES_QUERY_KEY } from '../query/useEvidences'

import type { CreateEvidenceFormValues } from '../../schema'

export type CreateEvidenceVariables = {
  data: CreateEvidenceFormValues
  showSimilarAlert: boolean
}

async function submitCreateEvidence({
  data,
  showSimilarAlert,
}: CreateEvidenceVariables) {
  if (!showSimilarAlert) {
    const isDuplicate = await checkDuplicateEvidence(
      data.occurrenceDateTime,
      data.transactionValue ?? ''
    )
    if (isDuplicate) throw new DuplicateEvidenceError()
  }
  const payload = buildCreatePayload(data)
  return createEvidence(payload)
}

export function useCreateEvidence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: submitCreateEvidence,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: EVIDENCES_QUERY_KEY })
    },
  })
}

export { DuplicateEvidenceError }
