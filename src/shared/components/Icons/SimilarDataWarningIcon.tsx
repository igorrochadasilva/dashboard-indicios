import { Box } from '@mui/material'

import similarDataWarningIcon from '@/assets/icons/warning-icon.svg'

export function SimilarDataWarningIcon() {
  return (
    <Box
      component="img"
      src={similarDataWarningIcon}
      alt=""
      width={20}
      height={20}
      sx={{ flexShrink: 0, display: 'block' }}
    />
  )
}
