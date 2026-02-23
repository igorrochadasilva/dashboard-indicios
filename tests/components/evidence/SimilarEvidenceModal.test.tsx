import { describe, it, expect } from 'vitest'

import { SimilarEvidenceModal } from '@/modules/evidence/components/SimilarEvidenceModal/SimilarEvidenceModal'

import { render, screen } from '../../test-utils'


describe('SimilarEvidenceModal', () => {
  it('matches snapshot when open', () => {
    const { container } = render(
      <SimilarEvidenceModal open onClose={() => {}} onEvaluate={() => {}} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders similar evidence title when open', () => {
    render(
      <SimilarEvidenceModal open onClose={() => {}} onEvaluate={() => {}} />
    )
    expect(
      screen.getAllByText(/indício semelhante/i).length
    ).toBeGreaterThanOrEqual(1)
  })
})
