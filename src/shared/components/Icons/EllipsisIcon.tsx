import { Box } from '@mui/material'

export function EllipsisIcon() {
  return (
    <Box
      component="svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
      sx={{ display: 'block' }}
    >
      <circle cx={6} cy={12} r={1.5} />
      <circle cx={12} cy={12} r={1.5} />
      <circle cx={18} cy={12} r={1.5} />
    </Box>
  )
}
