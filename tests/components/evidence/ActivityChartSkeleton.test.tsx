import { describe, it, expect } from 'vitest'

import { ActivityChartSkeleton } from '@/modules/evidence/components/EvidencePageSkeleton/ActivityChartSkeleton'

import { render } from '../../test-utils'

describe('ActivityChartSkeleton', () => {
  it('matches snapshot', () => {
    const { container } = render(<ActivityChartSkeleton />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
