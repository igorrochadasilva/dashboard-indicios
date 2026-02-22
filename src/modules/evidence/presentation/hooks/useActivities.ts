import { useQuery } from '@tanstack/react-query'

import { getActivities } from '../../data'

const ACTIVITIES_QUERY_KEY = ['activities']

export function useActivities() {
  return useQuery({
    queryKey: ACTIVITIES_QUERY_KEY,
    queryFn: getActivities,
  })
}
