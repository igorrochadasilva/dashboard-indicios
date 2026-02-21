import { Box } from '@mui/material'

import plusIcon from '@/assets/icons/plus-icon.svg'

export function PlusIcon({ active: _active }: { active: boolean }) {
  return (
    <Box
      component="img"
      src={plusIcon}
      alt=""
      width={13}
      height={13}
      sx={{ display: 'block' }}
    />
  )
}
