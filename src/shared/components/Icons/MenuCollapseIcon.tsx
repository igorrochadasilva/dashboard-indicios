import { Box } from '@mui/material'

import menuIcon from '@/assets/icons/menu.svg'

export function MenuCollapseIcon() {
  return (
    <Box
      component="img"
      src={menuIcon}
      alt="Recolher menu"
      width={40}
      height={40}
      sx={{ display: 'block' }}
    />
  )
}
