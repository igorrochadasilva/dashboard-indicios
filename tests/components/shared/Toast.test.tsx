import { describe, it, expect } from 'vitest'

import { Toast } from '@/shared/components/Toast/Toast'

import { render, screen } from '../../test-utils'

describe('Toast', () => {
  it('matches snapshot (error variant)', () => {
    const { container } = render(
      <Toast
        open
        onClose={() => {}}
        title="Erro"
        message="Algo deu errado."
        variant="error"
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches snapshot (success variant)', () => {
    const { container } = render(
      <Toast
        open
        onClose={() => {}}
        title=""
        message="Indício criado com sucesso."
        variant="success"
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders message when open', () => {
    render(
      <Toast
        open
        onClose={() => {}}
        title="Título"
        message="Mensagem do toast"
        variant="error"
      />
    )
    expect(screen.getByText('Mensagem do toast')).toBeInTheDocument()
  })
})
