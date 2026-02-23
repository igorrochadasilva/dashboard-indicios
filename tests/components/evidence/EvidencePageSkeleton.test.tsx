import { describe, it, expect } from 'vitest'

import { EvidencePageSkeleton } from '@/modules/evidence/components/EvidencePageSkeleton/EvidencePageSkeleton'

import { render } from '../../test-utils'


describe('EvidencePageSkeleton', () => {
  it('matches snapshot', () => {
    const { container } = render(<EvidencePageSkeleton />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
