import { Box } from '@mui/material'

import bellIcon from '@/assets/icons/bell.svg'

export function BellIcon() {
  return (
    <Box
      component="img"
      src={bellIcon}
      alt=""
      width={24}
      height={24}
      sx={{ display: 'block' }}
    />
  )
}
