import { Box, IconButton, Paper, Typography, useTheme } from '@mui/material'

import '@/app/theme/theme-augment'

import closeIcon from '@/assets/icons/close-icon.svg'
import redCloseIcon from '@/assets/icons/red-close-icon.svg'

const defaultErrorStyles = {
  bg: '#FBEBE9',
  title: '#A02817',
  border: 'rgba(213, 53, 31, 0.3)',
}

type ErrorToastProps = {
  title: string
  message: string
  onClose: () => void
}

export function ErrorToast({ title, message, onClose }: ErrorToastProps) {
  const theme = useTheme()
  const { error, text } = theme.palette
  const custom = (
    theme.palette as {
      custom?: { toastBg: string; toastTitle: string; toastBorder: string }
    }
  ).custom

  const styles = {
    bg: custom?.toastBg ?? defaultErrorStyles.bg,
    title: custom?.toastTitle ?? defaultErrorStyles.title,
    border: custom?.toastBorder ?? defaultErrorStyles.border,
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        width: 484,
        height: 112,
        border: '1px solid',
        borderColor: styles.border,
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: styles.bg,
      }}
    >
      <Box sx={{ width: 4, alignSelf: 'stretch', bgcolor: error.main }} />
      <Box
        sx={{
          flex: 1,
          p: 2,
          pr: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <Box
            component="img"
            src={redCloseIcon}
            alt=""
            sx={{ width: 19, height: 19, flexShrink: 0, display: 'block' }}
          />
          <Typography
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontWeight: 600,
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: 0,
              color: styles.title,
              flex: 1,
              minWidth: 0,
            }}
          >
            {title}
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ flexShrink: 0, ml: 'auto', p: 0.5 }}
            aria-label="Fechar"
          >
            <Box
              component="img"
              src={closeIcon}
              alt=""
              sx={{ width: 14, height: 14, display: 'block' }}
            />
          </IconButton>
        </Box>
        <Typography
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontWeight: 400,
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: 0,
            color: text.primary,
            pl: 4.5,
          }}
        >
          {message}
        </Typography>
      </Box>
    </Paper>
  )
}
