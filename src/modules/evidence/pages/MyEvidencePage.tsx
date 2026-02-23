import { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'

import { ROUTES } from '@/app/constants'
import { texts } from '@/app/texts'
import {
  ActivityChartSection,
  EvidenceListSection,
} from '@/modules/evidence/components'
import { PageHeader } from '@/shared/components/PageHeader'
import { Toast } from '@/shared/components/Toast'

const getShowSuccessToastFromState = (state: unknown) =>
  Boolean((state as { showSuccessToast?: boolean })?.showSuccessToast)

export function MyEvidencePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [successToastOpen, setSuccessToastOpen] = useState(() =>
    getShowSuccessToastFromState(location.state)
  )

  useEffect(() => {
    if (getShowSuccessToastFromState(location.state)) {
      void navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, location.pathname, navigate])

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
        <EvidenceListSection />
        <ActivityChartSection />
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
