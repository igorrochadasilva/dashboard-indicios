import { Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router'

import { ROUTES } from '@/app/constants'
import { Sidebar } from '@/shared/components/Sidebar'
import { TopBar } from '@/shared/components/TopBar'

export function AppLayout() {
  const location = useLocation()
  const showSidebar = location.pathname !== ROUTES.createEvidence

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {showSidebar && <Sidebar />}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          marginLeft: showSidebar ? '240px' : 0,
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
