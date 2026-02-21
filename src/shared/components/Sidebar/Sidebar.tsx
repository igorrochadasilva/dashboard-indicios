import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  useTheme,
} from '@mui/material'
import { Link, useLocation } from 'react-router'

import { ROUTES, SIDEBAR_MENU_ITEMS } from '@/app/constants'
import type { SidebarMenuLabelKey } from '@/app/constants/sidebarMenu'
import { texts } from '@/app/texts'
import {
  MenuCollapseIcon,
  MonogramIcon,
  PATH_TO_ICON,
} from '@/shared/components/Icons'

type SidebarCustomPalette = {
  sidebarBg: string
  sidebarItemActiveBg: string
  sidebarItemActiveBgHover: string
}

export function Sidebar() {
  const theme = useTheme()
  const location = useLocation()
  const custom = (theme.palette as { custom?: SidebarCustomPalette }).custom!

  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        height: '100%',
        minHeight: '100vh',
        bgcolor: custom.sidebarBg,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 1,
          mx: 1,
          mb: '40px',
          minHeight: 40,
        }}
      >
        <MonogramIcon />
        <Box
          component="button"
          type="button"
          aria-label={texts.sidebar.menuCollapseAriaLabel}
          sx={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderRadius: 1,
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <MenuCollapseIcon />
        </Box>
      </Box>

      <Box sx={{ width: 208, mx: 2 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 12,
            lineHeight: '18px',
            letterSpacing: 0,
            color: theme.palette.primary.main,
            mb: 2,
          }}
        >
          {texts.sidebar.logoLabel}
        </Typography>

        <List disablePadding sx={{ py: 0 }}>
          {SIDEBAR_MENU_ITEMS.map(({ labelKey, path }) => {
            const active =
              path === ROUTES.root
                ? location.pathname === ROUTES.root
                : location.pathname.startsWith(path)
            const Icon = PATH_TO_ICON[path]
            return (
              <ListItemButton
                key={path}
                component={Link}
                to={path}
                selected={active}
                sx={{
                  width: 208,
                  height: 40,
                  borderRadius: '4px',
                  px: 1,
                  pl: '12px',
                  pr: '16px',
                  mb: 2,
                  ...(active && {
                    bgcolor: custom.sidebarItemActiveBg,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiTypography-root': {
                      color: theme.palette.primary.main,
                      fontWeight: 400,
                    },
                    '&.Mui-selected': {
                      bgcolor: custom.sidebarItemActiveBg,
                      '&:hover': {
                        bgcolor: custom.sidebarItemActiveBgHover,
                      },
                    },
                  }),
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon active={active} />
                </ListItemIcon>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: '24px',
                    letterSpacing: 0,
                    color: active
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  }}
                >
                  {texts.sidebar.menu[labelKey as SidebarMenuLabelKey]}
                </Typography>
              </ListItemButton>
            )
          })}
        </List>
      </Box>
    </Box>
  )
}
