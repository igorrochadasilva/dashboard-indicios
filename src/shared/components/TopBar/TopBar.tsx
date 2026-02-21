import { Avatar, Badge, Box, IconButton, useTheme } from '@mui/material'

import '@/app/theme/theme-augment'

import { BellIcon } from '../Icons/BellIcon'
import { ChevronDownIcon } from '../Icons/chevronDown'

export function TopBar() {
  const theme = useTheme()
  const avatarBg = (theme.palette as { custom?: { avatarBg?: string } }).custom
    ?.avatarBg

  return (
    <Box
      component="header"
      sx={{
        height: 88,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: 2,
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <IconButton
          aria-label="Notificações"
          size="medium"
          sx={{ color: 'primary.main' }}
        >
          <Badge color="error" variant="dot">
            <BellIcon active={false} />
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
          <ChevronDownIcon active={false} />
        </Box>
      </Box>
    </Box>
  )
}
