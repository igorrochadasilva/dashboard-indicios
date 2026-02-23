import { describe, it, expect } from 'vitest'


import { ClassificationChip } from '@/modules/evidence/components/ReportedEvidenceTable/ClassificationChip'
import { EvidenceClassification } from '@/modules/evidence/types'

import { render } from '../../test-utils'

describe('ClassificationChip', () => {
  it('matches snapshot for fraud attempt', () => {
    const { container } = render(
      <ClassificationChip
        classification={EvidenceClassification.FraudAttempt}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches snapshot for fraud occurrence', () => {
    const { container } = render(
      <ClassificationChip
        classification={EvidenceClassification.FraudOccurrence}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
