import { describe, it, expect } from 'vitest'

import { EvidenceTableSkeleton } from '@/modules/evidence/components/EvidencePageSkeleton/EvidenceTableSkeleton'

import { render } from '../../test-utils'


describe('EvidenceTableSkeleton', () => {
  it('matches snapshot', () => {
    const { container } = render(<EvidenceTableSkeleton />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
