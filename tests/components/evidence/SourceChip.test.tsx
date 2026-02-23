import { describe, it, expect } from 'vitest'


import { SourceChip } from '@/modules/evidence/components/ReportedEvidenceTable/SourceChip'
import { EvidenceSource } from '@/modules/evidence/types'

import { render } from '../../test-utils'

describe('SourceChip', () => {
  it('matches snapshot for form source', () => {
    const { container } = render(<SourceChip source={EvidenceSource.Form} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches snapshot for csv source', () => {
    const { container } = render(<SourceChip source={EvidenceSource.Csv} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
