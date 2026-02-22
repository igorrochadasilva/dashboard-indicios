import { useQuery } from '@tanstack/react-query'

import { getEvidences } from '../api'

import type { GetEvidencesParams } from '../types'

const EVIDENCES_QUERY_KEY = ['evidences']

export function useEvidences(params: GetEvidencesParams = {}) {
  const { page = 1, limit = 10, transactionId, classification } = params

  return useQuery({
    queryKey: [
      ...EVIDENCES_QUERY_KEY,
      page,
      limit,
      transactionId ?? '',
      classification ?? '',
    ],
    queryFn: () => getEvidences({ page, limit, transactionId, classification }),
  })
}
