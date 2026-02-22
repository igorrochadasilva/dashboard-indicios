import { Box } from '@mui/material'

import monogramaIcon from '@/assets/icons/monograma.svg'

export function MonogramIcon() {
  return (
    <Box
      component="img"
      src={monogramaIcon}
      alt="Logo"
      width={40}
      height={40}
      sx={{ display: 'block' }}
    />
  )
}
