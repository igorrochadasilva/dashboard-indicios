import { Box } from '@mui/material'

import monogramaIcon from '@/assets/icons/monograma.svg'

const ICON_SIZE = 40

export function MonogramIcon() {
  return (
    <Box
      component="img"
      src={monogramaIcon}
      alt="Logo"
      width={ICON_SIZE}
      height={ICON_SIZE}
      sx={{ display: 'block' }}
    />
  )
}
