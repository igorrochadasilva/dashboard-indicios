import { useActivities } from '@/modules/evidence/hooks'

import { ActivityChartSkeleton } from '../EvidencePageSkeleton/ActivityChartSkeleton'
import { SubmissionsByActivityChart } from '../SubmissionsByActivityChart/SubmissionsByActivityChart'

export function ActivityChartSection() {
  const activitiesQuery = useActivities()
  const activities = activitiesQuery.data ?? []
  const isActivitiesLoading = activitiesQuery.isLoading

  if (isActivitiesLoading) {
    return <ActivityChartSkeleton />
  }

  return <SubmissionsByActivityChart data={activities} />
}
