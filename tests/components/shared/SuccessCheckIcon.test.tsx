import { describe, it, expect } from 'vitest'

import { SuccessCheckIcon } from '@/shared/components/Icons/SuccessCheckIcon'

import { render } from '../../test-utils'


describe('SuccessCheckIcon', () => {
  it('matches snapshot with default size', () => {
    const { container } = render(<SuccessCheckIcon />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches snapshot with custom size', () => {
    const { container } = render(<SuccessCheckIcon size={32} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
