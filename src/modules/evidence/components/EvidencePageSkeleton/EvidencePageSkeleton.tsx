import { Box } from '@mui/material'

import { ActivityChartSkeleton } from './ActivityChartSkeleton'
import { EvidenceTableSkeleton } from './EvidenceTableSkeleton'

export function EvidencePageSkeleton() {
  return (
    <Box display="flex" flexDirection="column" gap={'56px'}>
      <EvidenceTableSkeleton />
      <ActivityChartSkeleton />
    </Box>
  )
}
