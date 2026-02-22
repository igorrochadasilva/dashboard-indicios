import { useState } from 'react'
import { Box, Container } from '@mui/material'

import { ROUTES } from '@/app/constants'
import { texts } from '@/app/texts'
import {
  EvidenceFilters,
  EvidencePageSkeleton,
  ReportedEvidenceTable,
  SubmissionsByActivityChart,
} from '@/modules/evidence/components'
import { useActivities, useEvidences } from '@/modules/evidence/hooks'
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
  const isLoading = evidencesQuery.isLoading || activitiesQuery.isLoading

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
          <EvidencePageSkeleton />
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
