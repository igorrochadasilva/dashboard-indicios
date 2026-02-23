import { describe, it, expect } from 'vitest'

import { PageHeader } from '@/shared/components/PageHeader/PageHeader'

import { render, screen } from '../../test-utils'


describe('PageHeader', () => {
  it('matches snapshot with title only', () => {
    const { container } = render(<PageHeader title="Meus indícios" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches snapshot with action button', () => {
    const { container } = render(
      <PageHeader
        title="Meus indícios"
        actionLabel="Novo indício"
        actionTo="/criar-indicio"
      />
    )
    expect(container.firstChild).toMatchSnapshot()
    expect(
      screen.getByRole('link', { name: /novo indício/i })
    ).toBeInTheDocument()
  })
})
