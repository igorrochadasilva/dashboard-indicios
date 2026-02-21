import { Box } from '@mui/material'

import homeIcon from '@/assets/icons/home.svg'

export function HomeIcon({ active: _active }: { active: boolean }) {
  return (
    <Box
      component="img"
      src={homeIcon}
      alt=""
      width={24}
      height={24}
      sx={{ display: 'block' }}
    />
  )
}
