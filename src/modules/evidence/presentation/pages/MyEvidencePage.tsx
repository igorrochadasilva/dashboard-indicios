import { Box, Container } from '@mui/material'

import { ROUTES } from '@/app/constants'
import { texts } from '@/app/texts'
import { PageHeader } from '@/shared/components/PageHeader'

export function MyEvidencePage() {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <PageHeader
          title={texts.myEvidence.pageTitle}
          actionLabel={texts.myEvidence.newEvidenceButton}
          actionTo={ROUTES.createEvidence}
        />
      </Box>
    </Container>
  )
}
