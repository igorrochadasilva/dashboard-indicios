import { Box } from '@mui/material'
import { Outlet } from 'react-router'

import { Sidebar } from '@/shared/components/Sidebar'
import { TopBar } from '@/shared/components/TopBar'

export function AppLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        <TopBar />
        <Box component="main" sx={{ flex: 1, minHeight: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
