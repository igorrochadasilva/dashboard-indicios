import { createTheme } from '@mui/material'

import './theme-augment'

/**
 * Cores de texto do projeto
 * #3C3C3D - texto principal
 * #1B7331 - verde (destaque)
 * #FFFFFF - branco
 * #D5351F - vermelho/erro
 *
 * Cores de background de botões
 * #9CAB76 - oliva
 * #ED9328 - laranja/aviso
 * #76AB83 - verde claro
 * #5A731B - verde escuro
 * #1B7331 - verde principal
 * #D5351F - vermelho
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1B7331',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#5A731B',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#76AB83',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ED9328',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D5351F',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#3C3C3D',
      secondary: '#1B7331',
      disabled: 'rgba(60, 60, 61, 0.38)',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    custom: {
      olive: '#9CAB76',
      oliveHover: '#8a9a68',
      sidebarBg: '#F3F3F7',
      sidebarItemActiveBg: '#E9EBF6',
      sidebarItemActiveBgHover: '#E9EBF6',
      avatarBg: '#E8F1EA',
    },
  },
  typography: {
    fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
    h1: {
      fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
    },
    h2: {
      fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
    },
    h3: {
      fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
    },
    h4: {
      fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
    },
    h5: {
      fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
    },
    h6: {
      fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
    },
    body1: {
      fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
    },
    body2: {
      fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
    },
    button: {
      fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
          color: '#3C3C3D',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
} as Parameters<typeof createTheme>[0])

export default theme
