import { describe, it, expect } from 'vitest'

import { BellIcon } from '@/shared/components/Icons/BellIcon'

import { render } from '../../test-utils'

describe('BellIcon', () => {
  it('matches snapshot', () => {
    const { container } = render(<BellIcon />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
