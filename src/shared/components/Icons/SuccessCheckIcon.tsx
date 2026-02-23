import { Box } from '@mui/material'

import successCheckIcon from '@/assets/icons/success-icon.svg'

type SuccessCheckIconProps = {
  size?: number
}

export function SuccessCheckIcon({ size = 24 }: SuccessCheckIconProps) {
  return (
    <Box
      component="img"
      src={successCheckIcon}
      alt=""
      width={size}
      height={size}
      sx={{ flexShrink: 0, display: 'block' }}
    />
  )
}
