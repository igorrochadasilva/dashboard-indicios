import {
  EvidenceClassification,
  EvidenceSource,
  type ReportedEvidenceRow,
} from '../components/ReportedEvidenceTable/types'

export const MOCK_REPORTED_EVIDENCE_ROWS: ReportedEvidenceRow[] = [
  {
    id: '1',
    transactionId: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8g9h0i',
    source: EvidenceSource.Form,
    classification: EvidenceClassification.FraudAttempt,
    executorName: 'Nome Sobrenome',
    executorDocument: '000.000.000-00',
    occurrenceDate: '01/01/2024 às 11:11:11',
  },
  {
    id: '2',
    transactionId: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    source: EvidenceSource.Csv,
    classification: EvidenceClassification.FraudOccurrence,
    executorName: 'Nome da empresa env...',
    executorDocument: '00.000.000/0000-00',
    occurrenceDate: '02/01/2024 às 14:22:33',
  },
  {
    id: '3',
    transactionId: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    source: EvidenceSource.Api,
    classification: EvidenceClassification.FraudAttempt,
    executorName: 'Outro Executor',
    executorDocument: '111.111.111-11',
    occurrenceDate: '03/01/2024 às 09:00:00',
  },
  {
    id: '4',
    transactionId: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
    source: EvidenceSource.Antifraud,
    classification: EvidenceClassification.FraudOccurrence,
    executorName: 'Empresa XYZ',
    executorDocument: '11.111.111/1111-11',
    occurrenceDate: '04/01/2024 às 16:45:00',
  },
]
