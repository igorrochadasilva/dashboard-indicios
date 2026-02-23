import type { SubmissionsByActivityDataPoint } from '@/modules/evidence/types'

import { endpoints } from '../config'
import { fetchJson } from '../http'

export async function getActivities(): Promise<
  SubmissionsByActivityDataPoint[]
> {
  return fetchJson<SubmissionsByActivityDataPoint[]>(endpoints.activities)
}
