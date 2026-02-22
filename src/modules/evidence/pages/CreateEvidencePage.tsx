import { useRef } from 'react'
import { Box, Container } from '@mui/material'

import { texts } from '@/app/texts'
import {
  CreateEvidenceForm,
  CreateEvidenceFormActions,
  type CreateEvidenceFormHandle,
} from '@/modules/evidence/components'
import { PageHeader } from '@/shared/components/PageHeader'

export function CreateEvidencePage() {
  const formRef = useRef<CreateEvidenceFormHandle>(null)

  return (
    <Box width="100%" display="flex" flexDirection="column">
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Box
          mt={'64px'}
          display="flex"
          flexDirection="column"
          gap={4}
          maxWidth={1120}
          pb={4}
        >
          <PageHeader title={texts.createEvidence.pageTitle} />
          <CreateEvidenceForm ref={formRef} />
        </Box>
      </Container>
      <CreateEvidenceFormActions
        onDiscard={() => formRef.current?.resetForm()}
        onSubmit={() => formRef.current?.submit()}
      />
    </Box>
  )
}
