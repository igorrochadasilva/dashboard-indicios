import { Box, Snackbar } from '@mui/material'

import { ErrorToast } from './ErrorToast'
import { SuccessToast } from './SuccessToast'

export type ToastProps = {
  open: boolean
  onClose: () => void
  title: string
  message: string
  variant?: 'error' | 'success'
}

const snackbarSx = { '&.MuiSnackbar-root': { bottom: 24, right: 24 } }

export function Toast({
  open,
  onClose,
  title,
  message,
  variant = 'error',
}: ToastProps) {
  const isSuccess = variant === 'success'

  return (
    <Snackbar
      open={open}
      autoHideDuration={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={onClose}
      sx={snackbarSx}
    >
      <Box component="span" sx={{ display: 'contents' }}>
        {isSuccess ? (
          <SuccessToast message={message} onClose={onClose} />
        ) : (
          <ErrorToast title={title} message={message} onClose={onClose} />
        )}
      </Box>
    </Snackbar>
  )
}
