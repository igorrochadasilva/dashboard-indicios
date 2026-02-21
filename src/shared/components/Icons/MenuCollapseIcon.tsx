import { Box } from '@mui/material'

import menuIcon from '@/assets/icons/menu.svg'

const ICON_SIZE = 40

export function MenuCollapseIcon() {
  return (
    <Box
      component="img"
      src={menuIcon}
      alt="Recolher menu"
      width={ICON_SIZE}
      height={ICON_SIZE}
      sx={{ display: 'block' }}
    />
  )
}
