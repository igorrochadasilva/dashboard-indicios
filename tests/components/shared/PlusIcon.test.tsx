import { describe, it, expect } from 'vitest'

import { PlusIcon } from '@/shared/components/Icons/PlusIcon'

import { render } from '../../test-utils'

describe('PlusIcon', () => {
  it('matches snapshot', () => {
    const { container } = render(<PlusIcon />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
