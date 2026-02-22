import { Box, IconButton, TableCell, TableRow } from '@mui/material'

import { EllipsisIcon } from '@/shared/components/Icons'

import { ClassificationChip } from './ClassificationChip'
import { SourceChip } from './SourceChip'

import type { ReportedEvidenceRow } from './types'

const bodyCellSx = {
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
  letterSpacing: 0,
  color: 'text.primary',
}

type ReportedEvidenceTableRowProps = {
  row: ReportedEvidenceRow
  index: number
  stripedBg: string
}

export function ReportedEvidenceTableRow({
  row,
  index,
  stripedBg,
}: ReportedEvidenceTableRowProps) {
  const rowBg = index % 2 === 1 ? stripedBg : 'background.paper'

  return (
    <TableRow sx={{ bgcolor: rowBg }}>
      <TableCell sx={bodyCellSx}>{row.transactionId}</TableCell>
      <TableCell>
        <SourceChip source={row.source} />
      </TableCell>
      <TableCell>
        <ClassificationChip classification={row.classification} />
      </TableCell>
      <TableCell sx={bodyCellSx}>
        <Box component="span" sx={{ display: 'block' }}>
          {row.executorName}
        </Box>
        <Box
          component="span"
          sx={{
            display: 'block',
            fontWeight: 400,
            fontSize: 14,
            lineHeight: '22px',
            letterSpacing: 0,
          }}
        >
          {row.executorDocument}
        </Box>
      </TableCell>
      <TableCell sx={bodyCellSx}>{row.occurrenceDate}</TableCell>
      <TableCell padding="checkbox">
        <IconButton
          size="small"
          aria-label="Ações"
          sx={{ color: 'text.primary' }}
        >
          <EllipsisIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
