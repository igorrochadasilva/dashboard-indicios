import { useQuery } from '@tanstack/react-query'

import { getEvidences } from '../../data'

const EVIDENCES_QUERY_KEY = ['evidences']

export function useEvidences() {
  return useQuery({
    queryKey: EVIDENCES_QUERY_KEY,
    queryFn: getEvidences,
  })
}
