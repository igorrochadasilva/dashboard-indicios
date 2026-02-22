import { Box, Button, useTheme } from '@mui/material'

import { texts } from '@/app/texts'

const t = texts.createEvidence.form

export type CreateEvidenceFormActionsProps = {
  onDiscard: () => void
  onSubmit: () => void
  disabled?: boolean
}

export function CreateEvidenceFormActions({
  onDiscard,
  onSubmit,
  disabled = false,
}: CreateEvidenceFormActionsProps) {
  const theme = useTheme()
  const buttonTextSx = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: 0,
    textTransform: 'none',
  }

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        borderTop: 1,
        borderColor: 'divider',
        py: 3,
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          maxWidth: 1120,
          margin: '0 auto',
          px: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
        }}
      >
        <Button
          type="button"
          variant="outlined"
          disabled={disabled}
          onClick={onDiscard}
          sx={{
            width: 168,
            height: 40,
            border: '1px solid',
            borderColor: 'error.main',
            bgcolor: 'background.paper',
            color: 'error.main',
            ...buttonTextSx,
            '&:hover': {
              borderColor: 'error.main',
              bgcolor: 'action.hover',
            },
          }}
        >
          {t.discardButton}
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          disabled={disabled}
          onClick={onSubmit}
          sx={{
            width: 168,
            height: 40,
            color: 'primary.contrastText',
            ...buttonTextSx,
          }}
        >
          {t.submitButton}
        </Button>
      </Box>
    </Box>
  )
}
