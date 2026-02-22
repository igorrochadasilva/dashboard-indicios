import { TableCell, TableRow, useTheme } from '@mui/material'

import '@/app/theme/theme-augment'

import { texts } from '@/app/texts'

const headerCellSx = {
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  letterSpacing: 0,
}

export function ReportedEvidenceTableHeader() {
  const theme = useTheme()
  const custom = (theme.palette as { custom?: { tableHeader?: string } }).custom
  const headerColor = custom?.tableHeader ?? '#646466'
  const col = texts.myEvidence.tableColumns

  return (
    <TableRow sx={{ bgcolor: 'background.paper' }}>
      <TableCell sx={{ ...headerCellSx, color: headerColor }}>
        {col.transactionId}
      </TableCell>
      <TableCell sx={{ ...headerCellSx, color: headerColor }}>
        {col.reportedVia}
      </TableCell>
      <TableCell sx={{ ...headerCellSx, color: headerColor }}>
        {col.classification}
      </TableCell>
      <TableCell sx={{ ...headerCellSx, color: headerColor }}>
        {col.executor}
      </TableCell>
      <TableCell sx={{ ...headerCellSx, color: headerColor }}>
        {col.occurrenceDate}
      </TableCell>
      <TableCell padding="checkbox" sx={{ width: 56 }} />
    </TableRow>
  )
}
