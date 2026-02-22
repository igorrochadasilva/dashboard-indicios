import { Box } from '@mui/material'

import searchIcon from '@/assets/icons/search-icon.svg'

export function SearchIcon() {
  return (
    <Box
      component="img"
      src={searchIcon}
      alt=""
      width={17}
      height={17}
      sx={{ display: 'block' }}
    />
  )
}
