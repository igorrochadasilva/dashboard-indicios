import { describe, it, expect } from 'vitest'

import { DiscardEvidenceModal } from '@/modules/evidence/components/DiscardEvidenceModal/DiscardEvidenceModal'

import { render, screen } from '../../test-utils'

describe('DiscardEvidenceModal', () => {
  it('matches snapshot when open', () => {
    const { container } = render(
      <DiscardEvidenceModal open onClose={() => {}} onConfirm={() => {}} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders discard title when open', () => {
    render(
      <DiscardEvidenceModal open onClose={() => {}} onConfirm={() => {}} />
    )
    expect(
      screen.getAllByText(/descartar indício/i).length
    ).toBeGreaterThanOrEqual(1)
  })
})
