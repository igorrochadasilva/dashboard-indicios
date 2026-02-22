import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Box,
  useTheme,
} from '@mui/material'

import '@/app/theme/theme-augment'

export type EvidenceConfirmModalProps = {
  open: boolean
  onClose: () => void
  title: string
  description: string
  secondaryLabel: string
  onSecondary?: () => void
  primaryLabel: string
  onPrimary: () => void
}

export function EvidenceConfirmModal({
  open,
  onClose,
  title,
  description,
  secondaryLabel,
  onSecondary,
  primaryLabel,
  onPrimary,
}: EvidenceConfirmModalProps) {
  const theme = useTheme()
  const custom = (theme.palette as { custom?: { inputMuted?: string } }).custom
  const borderColor = custom?.inputMuted ?? '#A1A1A4'

  const handleSecondary = () => {
    ;(onSecondary ?? onClose)()
  }

  const handlePrimary = () => {
    onPrimary()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 520,
          height: 254,
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 32px)',
          borderRadius: '8px',
          boxShadow: 24,
          p: 0,
          overflow: 'hidden',
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        },
      }}
    >
      <DialogTitle
        component="div"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontWeight: 600,
          fontSize: 20,
          lineHeight: '30px',
          letterSpacing: 0,
          color: theme.palette.text.primary,
          pt: 3,
          pb: 5,
          px: 3,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ px: 3, pt: 0, pb: 3 }}>
        <Typography
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontWeight: 400,
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: 0,
            color: theme.palette.text.primary,
          }}
          mb={5}
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
            position: 'absolute',
            bottom: 0,
            right: 0,
            marginRight: 5,
            marginBottom: 5,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={handleSecondary}
            sx={{
              minWidth: 118,
              height: 40,
              backgroundColor: theme.palette.background.paper,
              border: '1px solid',
              borderColor,
              borderRadius: 1,
              color: theme.palette.primary.main,
              fontFamily: theme.typography.fontFamily,
              fontWeight: 600,
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: 0,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                borderColor,
              },
            }}
          >
            {secondaryLabel}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handlePrimary}
            sx={{
              minWidth: 148,
              height: 40,
              borderRadius: 1,
              fontFamily: theme.typography.fontFamily,
              fontWeight: 600,
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: 0,
              textTransform: 'none',
            }}
          >
            {primaryLabel}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
