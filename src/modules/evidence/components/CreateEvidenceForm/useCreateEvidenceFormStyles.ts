import { useTheme } from '@mui/material'

export function useCreateEvidenceFormStyles() {
  const theme = useTheme()
  const custom = (
    theme.palette as {
      custom?: { filterBoxBorder?: string; inputMuted?: string }
    }
  ).custom
  const borderColor = custom?.filterBoxBorder ?? ''
  const inputMuted = custom?.inputMuted ?? ''
  const errorColor = ''

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      border: '1px solid',
      borderColor: inputMuted,
      borderRadius: 1,
      fontFamily: theme.typography.fontFamily,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0,
      '& fieldset': { border: 'none' },
      '& input::placeholder': {
        color: inputMuted,
        opacity: 1,
        fontFamily: theme.typography.fontFamily,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '24px',
        letterSpacing: 0,
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: theme.typography.fontFamily,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0,
      color: inputMuted,
    },
    '& .MuiSelect-select': {
      fontFamily: theme.typography.fontFamily,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0,
    },
    '& .MuiOutlinedInput-input': {
      color: 'text.primary',
    },
  }

  const errorFieldSx = {
    '&.Mui-error .MuiOutlinedInput-root': { borderColor: errorColor },
    '& .MuiInputLabel-root.Mui-error': { color: errorColor },
    '& .MuiFormHelperText-root.Mui-error': { color: errorColor },
  }

  return { inputSx, errorFieldSx, borderColor, inputMuted }
}
