import { texts } from '@/app/texts'

import { EvidenceConfirmModal } from '../EvidenceConfirmModal'

const t = texts.createEvidence.form

export type SimilarEvidenceModalProps = {
  open: boolean
  onClose: () => void
  onEvaluate?: () => void
}

export function SimilarEvidenceModal({
  open,
  onClose,
  onEvaluate,
}: SimilarEvidenceModalProps) {
  return (
    <EvidenceConfirmModal
      open={open}
      onClose={onClose}
      title={t.similarEvidenceModalTitle}
      description={t.similarEvidenceModalDescription}
      secondaryLabel={t.similarEvidenceModalClose}
      onSecondary={onClose}
      primaryLabel={t.similarEvidenceModalEvaluate}
      onPrimary={onEvaluate ?? onClose}
    />
  )
}
