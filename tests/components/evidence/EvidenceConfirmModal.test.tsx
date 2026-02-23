import { describe, it, expect } from 'vitest'

import { EvidenceConfirmModal } from '@/modules/evidence/components/EvidenceConfirmModal/EvidenceConfirmModal'

import { render, screen } from '../../test-utils'

describe('EvidenceConfirmModal', () => {
  it('matches snapshot when open', () => {
    const { container } = render(
      <EvidenceConfirmModal
        open
        onClose={() => {}}
        title="Título do modal"
        description="Descrição do modal."
        secondaryLabel="Cancelar"
        primaryLabel="Confirmar"
        onPrimary={() => {}}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders title and description when open', () => {
    render(
      <EvidenceConfirmModal
        open
        onClose={() => {}}
        title="Título"
        description="Descrição"
        secondaryLabel="Cancelar"
        primaryLabel="Confirmar"
        onPrimary={() => {}}
      />
    )
    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(screen.getByText('Descrição')).toBeInTheDocument()
  })
})
