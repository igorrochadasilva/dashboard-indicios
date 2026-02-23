import { describe, it, expect } from 'vitest'

import { SimilarDataAlert } from '@/modules/evidence/components/CreateEvidenceSection/SimilarDataAlert'

import { render } from '../../test-utils'

describe('SimilarDataAlert', () => {
  it('matches snapshot', () => {
    const { container } = render(<SimilarDataAlert />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
