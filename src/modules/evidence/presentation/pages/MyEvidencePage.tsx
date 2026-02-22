import { Box, CircularProgress, Container } from '@mui/material'

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
  const evidencesQuery = useEvidences()
  const activitiesQuery = useActivities()

  const evidences = evidencesQuery.data ?? []
  const activities = activitiesQuery.data ?? []
  const isLoading = evidencesQuery.isLoading || activitiesQuery.isLoading

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
        <EvidenceFilters />
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress size={32} />
          </Box>
        ) : (
          <>
            <ReportedEvidenceTable rows={evidences} />
            <SubmissionsByActivityChart data={activities} />
          </>
        )}
      </Box>
    </Container>
  )
}
