import { useRef, useState } from 'react'
import { Box, Container } from '@mui/material'
import { useNavigate } from 'react-router'

import { CREATE_EVIDENCE_MODAL_IDS, ROUTES } from '@/app/constants'
import { useModalStore } from '@/app/store'
import { texts } from '@/app/texts'
import {
  CreateEvidenceForm,
  CreateEvidenceFormActions,
  DiscardEvidenceModal,
  SimilarDataAlert,
  SimilarEvidenceModal,
  type CreateEvidenceFormHandle,
} from '@/modules/evidence/components'
import {
  DuplicateEvidenceError,
  useCreateEvidence,
} from '@/modules/evidence/hooks'
import type { CreateEvidenceFormValues } from '@/modules/evidence/schema'
import { PageHeader } from '@/shared/components/PageHeader'

export function CreateEvidencePage() {
  const navigate = useNavigate()
  const formRef = useRef<CreateEvidenceFormHandle>(null)
  const { open: openModal, close: closeModal, isOpen } = useModalStore()
  const [showSimilarAlert, setShowSimilarAlert] = useState(false)

  const createEvidenceMutation = useCreateEvidence()

  const handleConfirmDiscard = () => {
    formRef.current?.resetForm()
    closeModal()
    void navigate(ROUTES.myEvidence)
  }

  const handleFormSubmit = (data: CreateEvidenceFormValues) => {
    if (createEvidenceMutation.isPending) return
    createEvidenceMutation.mutate(
      { data, showSimilarAlert },
      {
        onSuccess: () => {
          void navigate(ROUTES.myEvidence, {
            state: { showSuccessToast: true },
          })
        },
        onError: (err) => {
          if (err instanceof DuplicateEvidenceError) {
            openModal(CREATE_EVIDENCE_MODAL_IDS.similar)
          }
        },
      }
    )
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
        disabled={createEvidenceMutation.isPending}
        isSubmitting={createEvidenceMutation.isPending}
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
