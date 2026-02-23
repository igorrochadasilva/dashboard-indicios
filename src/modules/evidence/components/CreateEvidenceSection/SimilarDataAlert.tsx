import { Box, useTheme } from '@mui/material'

import { texts } from '@/app/texts'

export function SimilarDataAlert() {
  const theme = useTheme()
  const custom = (
    theme.palette as {
      custom?: { similarAlertBg?: string; similarAlertText?: string }
    }
  ).custom
  const backgroundColor = custom?.similarAlertBg ?? '#FDF4EA'
  const color = custom?.similarAlertText ?? '#6B4212'

  const t = texts.createEvidence.form
  return (
    <Box
      sx={{
        backgroundColor,
        color,
        fontFamily: theme.typography.fontFamily,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '24px',
        letterSpacing: '0%',
        borderRadius: 1,
        p: 2,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
      }}
    >
      <Box
        component="svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        sx={{ flexShrink: 0 }}
      >
        <path
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Box>
      <Box component="div" sx={{ flex: 1 }}>
        <Box component="p" sx={{ m: 0, '& + &': { mt: 1 } }}>
          {t.similarAlertLine1}
        </Box>
        <Box component="p" sx={{ m: 0 }}>
          {t.similarAlertLine2}
        </Box>
      </Box>
    </Box>
  )
}
