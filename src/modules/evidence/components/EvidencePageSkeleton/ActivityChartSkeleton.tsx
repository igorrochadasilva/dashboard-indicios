import { Box, Skeleton } from '@mui/material'

export function ActivityChartSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={180} height={24} sx={{ mb: 2 }} />
      <Skeleton
        variant="rounded"
        width="100%"
        height={340}
        sx={{ borderRadius: '8px' }}
      />
    </Box>
  )
}
