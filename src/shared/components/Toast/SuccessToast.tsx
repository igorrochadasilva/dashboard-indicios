import { Box, IconButton, Paper, Typography, useTheme } from '@mui/material'

import closeIcon from '@/assets/icons/close-icon.svg'

import { SuccessCheckIcon } from '../Icons/SuccessCheckIcon'

type SuccessToastProps = {
  message: string
  onClose: () => void
}

type SuccessToastPalette = {
  successToastBg: string
  successToastText: string
  successToastBorder: string
}

export function SuccessToast({ message, onClose }: SuccessToastProps) {
  const theme = useTheme()
  const custom = (theme.palette as { custom?: SuccessToastPalette }).custom

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 484,
        height: 56,
        border: '1px solid',
        borderColor: custom?.successToastBorder,
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: custom?.successToastBg,
        px: 2,
      }}
    >
      <SuccessCheckIcon size={24} />
      <Typography
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '24px',
          letterSpacing: 0,
          color: custom?.successToastText,
          flex: 1,
          minWidth: 0,
          ml: 1.5,
        }}
      >
        {message}
      </Typography>
      <IconButton
        size="small"
        onClick={onClose}
        sx={{ flexShrink: 0, p: 0.5, color: 'text.secondary' }}
        aria-label="Fechar"
      >
        <Box
          component="img"
          src={closeIcon}
          alt=""
          sx={{ width: 14, height: 14, display: 'block' }}
        />
      </IconButton>
    </Paper>
  )
}
