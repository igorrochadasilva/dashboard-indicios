import { describe, it, expect } from 'vitest'

import { SimilarDataWarningIcon } from '@/shared/components/Icons/SimilarDataWarningIcon'

import { render } from '../../test-utils'


describe('SimilarDataWarningIcon', () => {
  it('matches snapshot', () => {
    const { container } = render(<SimilarDataWarningIcon />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders an image', () => {
    const { container } = render(<SimilarDataWarningIcon />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/mock-icon.svg')
  })
})
