import { useRef, useState } from 'react'
import { Box, Container } from '@mui/material'
import { useNavigate } from 'react-router'

import { CREATE_EVIDENCE_MODAL_IDS, ROUTES } from '@/app/constants'
import { useModalStore } from '@/app/store'
import { texts } from '@/app/texts'
import { checkDuplicateEvidence, createEvidence } from '@/modules/evidence/api'
import {
  CreateEvidenceForm,
  CreateEvidenceFormActions,
  DiscardEvidenceModal,
  SimilarEvidenceModal,
  type CreateEvidenceFormHandle,
} from '@/modules/evidence/components'
import type { CreateEvidenceFormValues } from '@/modules/evidence/schema'
import { buildCreatePayload } from '@/modules/evidence/utils'
import { PageHeader } from '@/shared/components/PageHeader'

const alertBoxStyles = {
  backgroundColor: '#FDF4EA',
  color: '#6B4212',
  fontFamily: '"Source Sans Pro", sans-serif',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
  letterSpacing: '0%',
  borderRadius: 1,
  p: 2,
  display: 'flex',
  alignItems: 'flex-start',
  gap: 1.5,
}

function SimilarDataAlert() {
  const t = texts.createEvidence.form
  return (
    <Box sx={alertBoxStyles}>
      <Box
        component="svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        sx={{ flexShrink: 0 }}
      >
        <path
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Box>
      <Box component="div" sx={{ flex: 1 }}>
        <Box component="p" sx={{ m: 0, '& + &': { mt: 1 } }}>
          {t.similarAlertLine1}
        </Box>
        <Box component="p" sx={{ m: 0 }}>
          {t.similarAlertLine2}
        </Box>
      </Box>
    </Box>
  )
}

export function CreateEvidencePage() {
  const navigate = useNavigate()
  const formRef = useRef<CreateEvidenceFormHandle>(null)
  const { open: openModal, close: closeModal, isOpen } = useModalStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSimilarAlert, setShowSimilarAlert] = useState(false)

  const handleConfirmDiscard = () => {
    formRef.current?.resetForm()
    closeModal()
    void navigate(ROUTES.myEvidence)
  }

  const handleFormSubmit = async (data: CreateEvidenceFormValues) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      if (!showSimilarAlert) {
        const isDuplicate = await checkDuplicateEvidence(
          data.occurrenceDateTime,
          data.transactionValue ?? ''
        )
        if (isDuplicate) {
          openModal(CREATE_EVIDENCE_MODAL_IDS.similar)
          return
        }
      }
      const payload = buildCreatePayload(data)
      await createEvidence(payload)
      void navigate(ROUTES.myEvidence, { state: { showSuccessToast: true } })
    } catch (err) {
      console.error('[CreateEvidence] erro ao criar indício', err)
      // TODO: toast de erro
    } finally {
      setIsSubmitting(false)
    }
  }

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
          {showSimilarAlert && <SimilarDataAlert />}
          <CreateEvidenceForm
            ref={formRef}
            onSubmit={(data) => void handleFormSubmit(data)}
            similarDataWarning={showSimilarAlert}
          />
        </Box>
      </Container>
      <CreateEvidenceFormActions
        onDiscard={() => openModal(CREATE_EVIDENCE_MODAL_IDS.discard)}
        onSubmit={() => formRef.current?.submit()}
        disabled={isSubmitting}
      />
      <DiscardEvidenceModal
        open={isOpen(CREATE_EVIDENCE_MODAL_IDS.discard)}
        onClose={closeModal}
        onConfirm={handleConfirmDiscard}
      />
      <SimilarEvidenceModal
        open={isOpen(CREATE_EVIDENCE_MODAL_IDS.similar)}
        onClose={closeModal}
        onEvaluate={() => {
          closeModal()
          setShowSimilarAlert(true)
        }}
      />
    </Box>
  )
}
