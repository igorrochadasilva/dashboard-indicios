import { z } from 'zod/v3'

export const createEvidenceFormSchema = z.object({
  occurrenceDateTime: z.string().min(1, 'Este campo deve ser preenchido.'),
  occurrenceChannel: z.string(),
  institutionCnpj: z.string().min(1, 'Este campo deve ser preenchido.'),
  institutionName: z.string().min(1, 'Este campo deve ser preenchido.'),
  relatedActivity: z.string().min(1, 'Este campo deve ser preenchido.'),
  classification: z.string().min(1, 'Este campo deve ser preenchido.'),
  reason: z.string(),
  transactionValue: z.string(),
  contractValue: z.string(),
  typableLine: z.string(),
  occurrencePlace: z.string(),
})

export type CreateEvidenceFormValues = z.infer<typeof createEvidenceFormSchema>

export const createEvidenceFormDefaultValues: CreateEvidenceFormValues = {
  occurrenceDateTime: '',
  occurrenceChannel: '',
  institutionCnpj: '86.319.890/0001-14',
  institutionName: 'Data Rudder LTDA',
  relatedActivity: '',
  classification: '',
  reason: '',
  transactionValue: '',
  contractValue: '',
  typableLine: '',
  occurrencePlace: '',
}
