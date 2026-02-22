import { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'

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
import { Toast } from '@/shared/components/Toast'

const getShowSuccessToastFromState = (state: unknown) =>
  Boolean((state as { showSuccessToast?: boolean })?.showSuccessToast)

export function MyEvidencePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [successToastOpen, setSuccessToastOpen] = useState(() =>
    getShowSuccessToastFromState(location.state)
  )

  useEffect(() => {
    if (getShowSuccessToastFromState(location.state)) {
      void navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, location.pathname, navigate])

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
      <Toast
        variant="success"
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        title={texts.myEvidence.createSuccessToastTitle}
        message={texts.myEvidence.createSuccessToastMessage}
      />
    </Container>
  )
}
