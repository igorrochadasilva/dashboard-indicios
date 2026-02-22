import { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import '@/app/theme/theme-augment'

import { ROUTES } from '@/app/constants'
import { texts } from '@/app/texts'
import {
  EvidenceFilters,
  ReportedEvidenceTable,
  SubmissionsByActivityChart,
} from '@/modules/evidence/presentation/components'
import {
  useActivities,
  useEvidences,
} from '@/modules/evidence/presentation/hooks'
import { PageHeader } from '@/shared/components/PageHeader'

export function MyEvidencePage() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filterTransactionId, setFilterTransactionId] = useState('')
  const [filterClassification, setFilterClassification] = useState('')

  const evidencesQuery = useEvidences({
    page: page + 1,
    limit: rowsPerPage,
    transactionId: filterTransactionId || undefined,
    classification: filterClassification || undefined,
  })
  const activitiesQuery = useActivities()

  const evidencesResult = evidencesQuery.data
  const evidences = evidencesResult?.data ?? []
  const totalCount = evidencesResult?.totalCount ?? 0
  const activities = activitiesQuery.data ?? []
  const isLoading =
    evidencesQuery.isLoading || activitiesQuery.isLoading

  const handleApplyFilters = (values: {
    transactionId: string
    classification: string
  }) => {
    setFilterTransactionId(values.transactionId)
    setFilterClassification(values.classification)
    setPage(0)
  }

  const handleClearFilters = () => {
    setFilterTransactionId('')
    setFilterClassification('')
    setPage(0)
  }

  return (
    <Container maxWidth="lg">
      <Box
        mt={'64px'}
        display="flex"
        flexDirection="column"
        gap={'56px'}
        maxWidth={'1120px'}
      >
        <PageHeader
          title={texts.myEvidence.pageTitle}
          actionLabel={texts.myEvidence.newEvidenceButton}
          actionTo={ROUTES.createEvidence}
        />
        <EvidenceFilters
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
        {isLoading ? (
          <Box display="flex" flexDirection="column" gap={'56px'}>
            <Box>
              <Skeleton
                variant="text"
                width={220}
                height={24}
                sx={{ mb: 2 }}
              />
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: 'divider',
                  overflow: 'hidden',
                }}
              >
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <TableCell key={i}>
                          <Skeleton variant="text" height={24} />
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, rowIndex) => (
                      <TableRow key={rowIndex}>
                        <TableCell>
                          <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="rounded" width={80} height={24} />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="rounded" width={120} height={24} />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" height={20} />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" height={20} width={40} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Skeleton variant="text" width={200} height={24} />
                </Box>
              </TableContainer>
            </Box>
            <Box>
              <Skeleton
                variant="text"
                width={180}
                height={24}
                sx={{ mb: 2 }}
              />
              <Skeleton
                variant="rounded"
                width="100%"
                height={340}
                sx={{ borderRadius: '8px' }}
              />
            </Box>
          </Box>
        ) : (
          <>
            <ReportedEvidenceTable
              rows={evidences}
              totalCount={totalCount}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
            />
            <SubmissionsByActivityChart data={activities} />
          </>
        )}
      </Box>
    </Container>
  )
}
