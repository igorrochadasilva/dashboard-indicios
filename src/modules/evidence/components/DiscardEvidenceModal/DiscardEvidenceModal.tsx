import { texts } from '@/app/texts'

import { EvidenceConfirmModal } from '../EvidenceConfirmModal'

const t = texts.createEvidence.form

export type DiscardEvidenceModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DiscardEvidenceModal({
  open,
  onClose,
  onConfirm,
}: DiscardEvidenceModalProps) {
  return (
    <EvidenceConfirmModal
      open={open}
      onClose={onClose}
      title={t.discardModalTitle}
      description={t.discardModalDescription}
      secondaryLabel={t.discardModalCancel}
      primaryLabel={t.discardModalConfirm}
      onPrimary={onConfirm}
    />
  )
}
