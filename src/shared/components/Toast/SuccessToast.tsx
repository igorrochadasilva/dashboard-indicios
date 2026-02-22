import { Box, IconButton, Paper, Typography } from '@mui/material'

import closeIcon from '@/assets/icons/close-icon.svg'

import { SuccessCheckIcon } from './SuccessCheckIcon'

const styles = {
  bg: '#E8F5E9',
  text: '#1B7331',
  border: 'rgba(27, 115, 49, 0.3)',
}

type SuccessToastProps = {
  message: string
  onClose: () => void
}

export function SuccessToast({ message, onClose }: SuccessToastProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 484,
        height: 56,
        border: '1px solid',
        borderColor: styles.border,
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: styles.bg,
        px: 2,
      }}
    >
      <SuccessCheckIcon size={24} />
      <Typography
        sx={{
          fontFamily: '"Source Sans 3", "Source Sans Pro", sans-serif',
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '24px',
          letterSpacing: 0,
          color: styles.text,
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
