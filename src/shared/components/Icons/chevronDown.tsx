import { Box } from '@mui/material'

import chevronDownIcon from '@/assets/icons/chevron-down.svg'

export function ChevronDownIcon({ active: _active }: { active: boolean }) {
  return (
    <Box
      component="img"
      src={chevronDownIcon}
      alt=""
      width={8}
      height={4.4}
      sx={{ display: 'block' }}
    />
  )
}
