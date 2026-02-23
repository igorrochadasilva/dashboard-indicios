import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import '@/app/theme/theme-augment'
import { texts } from '@/app/texts'
import { Toast } from '@/shared/components'
import { SimilarDataWarningIcon } from '@/shared/components/Icons'

import {
  createEvidenceFormDefaultValues,
  createEvidenceFormSchema,
  type CreateEvidenceFormValues,
} from '../../schema'

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
  const theme = useTheme()
  const custom = (
    theme.palette as {
      custom?: { filterBoxBorder?: string; inputMuted?: string }
    }
  ).custom
  const borderColor = custom?.filterBoxBorder ?? ''
  const inputMuted = custom?.inputMuted ?? ''
  const errorColor = ''

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      border: '1px solid',
      borderColor: inputMuted,
      borderRadius: 1,
      fontFamily: theme.typography.fontFamily,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0,
      '& fieldset': { border: 'none' },
      '& input::placeholder': {
        color: inputMuted,
        opacity: 1,
        fontFamily: theme.typography.fontFamily,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '24px',
        letterSpacing: 0,
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: theme.typography.fontFamily,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0,
      color: inputMuted,
    },
    '& .MuiSelect-select': {
      fontFamily: theme.typography.fontFamily,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0,
    },
    '& .MuiOutlinedInput-input': {
      color: 'text.primary',
    },
  }

  const errorFieldSx = {
    '&.Mui-error .MuiOutlinedInput-root': { borderColor: errorColor },
    '& .MuiInputLabel-root.Mui-error': { color: errorColor },
    '& .MuiFormHelperText-root.Mui-error': { color: errorColor },
  }

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
        <Grid container rowSpacing={3} columnSpacing="20px">
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              {...register('occurrenceDateTime')}
              label={`${t.occurrenceDateTime}*`}
              type="datetime-local"
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
                sx: { backgroundColor: 'background.paper', px: 0.5 },
              }}
              error={Boolean(errors.occurrenceDateTime)}
              helperText={
                errors.occurrenceDateTime?.message ??
                (similarDataWarning ? t.similarFieldHelper : undefined)
              }
              slotProps={{
                input: {
                  sx: {
                    color: 'text.primary',
                    ...(similarDataWarning && { position: 'relative' }),
                  },
                  ...(similarDataWarning && {
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{
                          position: 'absolute',
                          right: 40,
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      >
                        <SimilarDataWarningIcon />
                      </InputAdornment>
                    ),
                  }),
                },
              }}
              sx={{
                ...inputSx,
                ...errorFieldSx,
                '& .MuiOutlinedInput-root': {
                  ...inputSx['& .MuiOutlinedInput-root'],
                  height: 40,
                },
                ...(similarDataWarning && !errors.occurrenceDateTime
                  ? {
                      '& .MuiFormHelperText-root': {
                        color: inputMuted,
                      },
                    }
                  : {}),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl
              fullWidth
              size="small"
              sx={{ ...inputSx, '& .MuiOutlinedInput-root': { height: 40 } }}
            >
              <InputLabel id="create-evidence-channel">
                {t.occurrenceChannel}
              </InputLabel>
              <Controller
                name="occurrenceChannel"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="create-evidence-channel"
                    label={t.occurrenceChannel}
                    value={field.value ?? ''}
                    sx={{ color: 'text.primary' }}
                  >
                    <MenuItem value="">{t.occurrenceChannelNone}</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              {...register('institutionCnpj')}
              label={`${t.institutionCnpj}*`}
              fullWidth
              size="small"
              error={Boolean(errors.institutionCnpj)}
              helperText={errors.institutionCnpj?.message}
              slotProps={{ input: { readOnly: true } }}
              sx={{
                ...inputSx,
                '& .MuiOutlinedInput-root': { height: 40, bgcolor: '#F7F7FB' },
                '& .MuiOutlinedInput-input': { color: '#A1A1A4' },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              {...register('institutionName')}
              label={`${t.institutionName}*`}
              fullWidth
              size="small"
              error={Boolean(errors.institutionName)}
              helperText={errors.institutionName?.message}
              slotProps={{ input: { readOnly: true } }}
              sx={{
                ...inputSx,
                '& .MuiOutlinedInput-root': { height: 40, bgcolor: '#F7F7FB' },
                '& .MuiOutlinedInput-input': { color: '#A1A1A4' },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl
              fullWidth
              size="small"
              error={Boolean(errors.relatedActivity)}
              sx={{
                ...inputSx,
                ...errorFieldSx,
                '& .MuiOutlinedInput-root': { height: 40 },
              }}
            >
              <InputLabel id="create-evidence-related-activity">
                {t.relatedActivity}*
              </InputLabel>
              <Controller
                name="relatedActivity"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="create-evidence-related-activity"
                    label={`${t.relatedActivity}*`}
                    value={field.value ?? ''}
                    sx={{ color: 'text.primary' }}
                  >
                    <MenuItem value="">
                      <em>{t.selectPlaceholder}</em>
                    </MenuItem>
                    {Object.entries(t.relatedActivityOptions).map(
                      ([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      )
                    )}
                  </Select>
                )}
              />
              <FormHelperText>{errors.relatedActivity?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl
              fullWidth
              size="small"
              error={Boolean(errors.classification)}
              sx={{
                ...inputSx,
                ...errorFieldSx,
                '& .MuiOutlinedInput-root': { height: 40 },
              }}
            >
              <InputLabel id="create-evidence-classification">
                {t.classification}*
              </InputLabel>
              <Controller
                name="classification"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="create-evidence-classification"
                    label={`${t.classification}*`}
                    value={field.value ?? ''}
                    sx={{ color: 'text.primary' }}
                  >
                    <MenuItem value="">
                      <em>{t.selectPlaceholder}</em>
                    </MenuItem>
                    {Object.entries(t.classificationOptions).map(
                      ([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      )
                    )}
                  </Select>
                )}
              />
              <FormHelperText>{errors.classification?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid size={12}>
            <TextField
              {...register('reason')}
              label={t.reason}
              fullWidth
              size="small"
              multiline
              rows={3}
              InputLabelProps={{ shrink: true }}
              sx={{
                ...inputSx,
                '& .MuiOutlinedInput-root': {
                  ...inputSx['& .MuiOutlinedInput-root'],
                  alignItems: 'flex-start',
                },
                '& .MuiInputLabel-root': {
                  backgroundColor: 'background.paper',
                  px: 0.5,
                  '&.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="transactionValue"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t.transactionValue}
                  fullWidth
                  size="small"
                  inputMode="decimal"
                  error={Boolean(errors.transactionValue)}
                  helperText={
                    errors.transactionValue?.message ??
                    (similarDataWarning ? t.similarFieldHelper : undefined)
                  }
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d,.]/g, '')
                    field.onChange(v)
                  }}
                  InputProps={
                    similarDataWarning
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              <SimilarDataWarningIcon />
                            </InputAdornment>
                          ),
                        }
                      : undefined
                  }
                  sx={{
                    ...inputSx,
                    ...errorFieldSx,
                    '& .MuiOutlinedInput-root': { height: 40 },
                    ...(similarDataWarning && !errors.transactionValue
                      ? {
                          '& .MuiFormHelperText-root': {
                            color: inputMuted,
                          },
                        }
                      : {}),
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="contractValue"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t.contractValue}
                  fullWidth
                  size="small"
                  inputMode="decimal"
                  error={Boolean(errors.contractValue)}
                  helperText={errors.contractValue?.message}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d,.]/g, '')
                    field.onChange(v)
                  }}
                  sx={{
                    ...inputSx,
                    ...errorFieldSx,
                    '& .MuiOutlinedInput-root': {
                      height: 40,
                      bgcolor: 'background.paper',
                      '&.Mui-focused': { bgcolor: 'background.paper' },
                      '&:hover': { bgcolor: 'background.paper' },
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              {...register('typableLine')}
              label={t.typableLine}
              fullWidth
              size="small"
              sx={{
                ...inputSx,
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  bgcolor: 'background.paper',
                  '&.Mui-focused': { bgcolor: 'background.paper' },
                  '&:hover': { bgcolor: 'background.paper' },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              {...register('occurrencePlace')}
              label={t.occurrencePlace}
              fullWidth
              size="small"
              sx={{
                ...inputSx,
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  bgcolor: 'background.paper',
                  '&.Mui-focused': { bgcolor: 'background.paper' },
                  '&:hover': { bgcolor: 'background.paper' },
                },
              }}
            />
          </Grid>
        </Grid>
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
