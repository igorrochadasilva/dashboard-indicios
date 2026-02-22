import { Chip, useTheme } from '@mui/material'

import { texts } from '@/app/texts'

import {
  EvidenceClassification,
  type EvidenceClassification as EvidenceClassificationType,
} from './types'

function getClassificationLabel(
  classification: EvidenceClassificationType
): string {
  const labels = texts.myEvidence.classificationOptions
  switch (classification) {
    case EvidenceClassification.FraudAttempt:
      return labels.fraudAttempt
    case EvidenceClassification.FraudOccurrence:
      return labels.fraudOccurrence
    default:
      return ''
  }
}

export function ClassificationChip({
  classification,
}: {
  classification: EvidenceClassificationType
}) {
  const theme = useTheme()
  const label = getClassificationLabel(classification)
  const bg =
    classification === EvidenceClassification.FraudAttempt
      ? theme.palette.warning.main
      : classification === EvidenceClassification.FraudOccurrence
        ? theme.palette.error.main
        : theme.palette.grey[500]

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        bgcolor: bg,
        color: theme.palette.primary.contrastText,
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '18px',
        letterSpacing: 0,
        textAlign: 'center',
        '& .MuiChip-label': { px: 1.5 },
      }}
    />
  )
}
