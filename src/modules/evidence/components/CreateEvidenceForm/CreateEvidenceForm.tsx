import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { texts } from '@/app/texts'
import { Toast } from '@/shared/components'

import {
  createEvidenceFormDefaultValues,
  createEvidenceFormSchema,
  type CreateEvidenceFormValues,
} from '../../schema'

import { CreateEvidenceFormFields } from './CreateEvidenceFormFields'
import { useCreateEvidenceFormStyles } from './useCreateEvidenceFormStyles'

const t = texts.createEvidence.form

export type CreateEvidenceFormProps = {
  onSubmit?: (data: CreateEvidenceFormValues) => void
  similarDataWarning?: boolean
}

export type CreateEvidenceFormHandle = {
  resetForm: () => void
  submit: () => void
}

export const CreateEvidenceForm = forwardRef<
  CreateEvidenceFormHandle,
  CreateEvidenceFormProps
>(function CreateEvidenceForm(
  { onSubmit: onSubmitProp, similarDataWarning = false },
  ref
) {
  const { inputSx, errorFieldSx, borderColor, inputMuted } =
    useCreateEvidenceFormStyles()
  const [toastOpen, setToastOpen] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateEvidenceFormValues>({
    resolver: zodResolver(createEvidenceFormSchema),
    defaultValues: createEvidenceFormDefaultValues,
  })

  const onSubmit = (data: CreateEvidenceFormValues) => {
    onSubmitProp?.(data)
  }

  const formElementRef = useRef<HTMLFormElement>(null)

  useImperativeHandle(ref, () => ({
    resetForm: () => reset(createEvidenceFormDefaultValues),
    submit: () => formElementRef.current?.requestSubmit(),
  }))

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: '8px',
        border: '1px solid',
        borderColor,
        overflow: 'hidden',
        p: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '24px',
          letterSpacing: 0,
          color: 'text.primary',
          mb: 3,
        }}
      >
        {t.sectionTitle}
      </Typography>

      <Box
        ref={formElementRef}
        component="form"
        id="create-evidence-form"
        onSubmit={handleSubmit(onSubmit, () => setToastOpen(true))}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <CreateEvidenceFormFields
          register={register}
          control={control}
          errors={errors}
          inputSx={inputSx}
          errorFieldSx={errorFieldSx}
          inputMuted={inputMuted}
          similarDataWarning={similarDataWarning}
        />
      </Box>

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        title={t.validationToastTitle}
        message={t.validationToastMessage}
      />
    </Paper>
  )
})
