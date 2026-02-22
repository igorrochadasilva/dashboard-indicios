import { Chip, useTheme } from '@mui/material'

import '@/app/theme/theme-augment'

import { texts } from '@/app/texts'

import {
  EvidenceSource,
  type EvidenceSource as EvidenceSourceType,
} from './types'

function getSourceLabel(source: EvidenceSourceType): string {
  const labels = texts.myEvidence.sourceLabels
  switch (source) {
    case EvidenceSource.Form:
      return labels.form
    case EvidenceSource.Csv:
      return labels.csv
    case EvidenceSource.Api:
      return labels.api
    case EvidenceSource.Antifraud:
      return labels.antifraud
    default:
      return ''
  }
}

export function SourceChip({ source }: { source: EvidenceSourceType }) {
  const theme = useTheme()
  const label = getSourceLabel(source)
  const custom = (theme.palette as { custom?: { olive?: string } }).custom
  const bg =
    source === EvidenceSource.Form
      ? (custom?.olive ?? theme.palette.secondary.main)
      : source === EvidenceSource.Csv
        ? theme.palette.success.main
        : source === EvidenceSource.Api
          ? theme.palette.secondary.main
          : source === EvidenceSource.Antifraud
            ? theme.palette.primary.main
            : theme.palette.grey[500]

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        width: '80px',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '18px',
        letterSpacing: 0,
        textAlign: 'center',
        bgcolor: bg,
        color: theme.palette.primary.contrastText,
        '& .MuiChip-label': { px: 1.5, width: '100%', textAlign: 'center' },
      }}
    />
  )
}
