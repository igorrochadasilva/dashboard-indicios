import { Box, Container } from '@mui/material'

import { ROUTES } from '@/app/constants'
import { texts } from '@/app/texts'
import {
  EvidenceFilters,
  ReportedEvidenceTable,
} from '@/modules/evidence/presentation/components'
import { PageHeader } from '@/shared/components/PageHeader'

export function MyEvidencePage() {
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
        <ReportedEvidenceTable />
      </Box>
    </Container>
  )
}
