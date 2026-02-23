import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Typography,
  useTheme,
} from '@mui/material'

import '@/app/theme/theme-augment'

import { texts } from '@/app/texts'

import { ReportedEvidenceTableHeader } from './ReportedEvidenceTableHeader'
import { ReportedEvidenceTableRow } from './ReportedEvidenceTableRow'

import type { ReportedEvidenceRow } from './types'

type ReportedEvidenceTableProps = {
  rows?: ReportedEvidenceRow[]
  totalCount?: number
  page?: number
  rowsPerPage?: number
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
}

export function ReportedEvidenceTable({
  rows = [],
  totalCount = 0,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
}: ReportedEvidenceTableProps) {
  const theme = useTheme()
  const rowsList = Array.isArray(rows) ? rows : []
  const custom = (
    theme.palette as {
      custom?: { tableRowStriped?: string; filterBoxBorder?: string }
    }
  ).custom
  const stripedBg = custom?.tableRowStriped ?? ''
  const borderColor = custom?.filterBoxBorder ?? ''

  return (
    <Box>
      <Typography
        component="h2"
        sx={{
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '24px',
          letterSpacing: 0,
          color: 'text.primary',
          mb: 2,
        }}
      >
        {texts.myEvidence.reportedEvidenceTitle}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '8px',
          border: '1px solid',
          borderColor,
          overflow: 'hidden',
        }}
      >
        <Table size="medium">
          <TableHead>
            <ReportedEvidenceTableHeader />
          </TableHead>
          <TableBody>
            {rowsList.map((row, index) => (
              <ReportedEvidenceTableRow
                key={row.id}
                row={row}
                index={index}
                stripedBg={stripedBg}
              />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(_, newPage) => onPageChange?.(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            const value = Number(e.target.value)
            onRowsPerPageChange?.(value)
            onPageChange?.(0)
          }}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage={texts.myEvidence.rowsPerPageLabel}
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows':
              { fontSize: 14, color: 'text.primary' },
          }}
        />
      </TableContainer>
    </Box>
  )
}
