import { describe, it, expect } from 'vitest'

import { CreateEvidenceFormActions } from '@/modules/evidence/components/CreateEvidenceFormActions/CreateEvidenceFormActions'

import { render, screen } from '../../test-utils'


describe('CreateEvidenceFormActions', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <CreateEvidenceFormActions onDiscard={() => {}} onSubmit={() => {}} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders discard and submit buttons', () => {
    render(
      <CreateEvidenceFormActions onDiscard={() => {}} onSubmit={() => {}} />
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    expect(buttons.some((b) => b.textContent?.includes('Descartar'))).toBe(true)
    expect(buttons.some((b) => b.textContent?.includes('Criar'))).toBe(true)
  })
})
