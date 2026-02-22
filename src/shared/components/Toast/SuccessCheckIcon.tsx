import { Box } from '@mui/material'

const CHECK_GREEN = '#1B7331'

type SuccessCheckIconProps = {
  size?: number
}

export function SuccessCheckIcon({ size = 24 }: SuccessCheckIconProps) {
  return (
    <Box
      component="svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      sx={{ flexShrink: 0, display: 'block' }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={CHECK_GREEN}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 12l3 3 5-6"
        stroke={CHECK_GREEN}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  )
}
