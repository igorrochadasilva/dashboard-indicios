import { Box, Container } from '@mui/material'

import { texts } from '@/app/texts'
import { PageHeader } from '@/shared/components/PageHeader'

export function CreateEvidencePage() {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <PageHeader title={texts.createEvidence.pageTitle} />
        <Box mt={4}>Página de criação de indício. Conteúdo em construção.</Box>
      </Box>
    </Container>
  )
}
