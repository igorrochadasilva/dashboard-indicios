import { Box } from '@mui/material'

import monitorIcon from '@/assets/icons/monitor.svg'

export function MonitoringIcon() {
  return (
    <Box
      component="img"
      src={monitorIcon}
      alt=""
      width={24}
      height={24}
      sx={{ display: 'block' }}
    />
  )
}
