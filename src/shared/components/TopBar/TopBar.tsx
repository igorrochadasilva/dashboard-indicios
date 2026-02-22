import { Avatar, Badge, Box, IconButton, useTheme } from '@mui/material'
import { useLocation } from 'react-router'

import { ROUTES } from '@/app/constants'
import '@/app/theme/theme-augment'

import { BellIcon } from '../Icons/BellIcon'
import { ChevronDownIcon } from '../Icons/chevronDown'
import { MonogramIcon } from '../Icons/MonogramIcon'

export function TopBar() {
  const theme = useTheme()
  const location = useLocation()
  const avatarBg = (theme.palette as { custom?: { avatarBg?: string } }).custom
    ?.avatarBg
  const isCreateEvidencePage = location.pathname === ROUTES.createEvidence

  return (
    <Box
      component="header"
      sx={{
        height: 88,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCreateEvidencePage ? 'space-between' : 'flex-end',
          gap: '20px',
          width: '1120px',
          maxWidth: '100%',
          px: isCreateEvidencePage ? 0 : 3,
        }}
      >
        {isCreateEvidencePage && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MonogramIcon />
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <IconButton
            aria-label="Notificações"
            size="medium"
            sx={{ color: 'primary.main' }}
          >
            <Badge color="error" variant="dot">
              <BellIcon />
            </Badge>
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              borderRadius: 1,
              py: 0.5,
              px: 0.5,
              '&:hover': { bgcolor: 'action.hover' },
            }}
            role="button"
            aria-label="Menu do usuário"
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: avatarBg ?? theme.palette.primary.light,
                color: 'primary.main',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: 20,
                lineHeight: '30px',
                letterSpacing: 0,
                textAlign: 'center',
              }}
            >
              NS
            </Avatar>
            <ChevronDownIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
