import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form'

import { texts } from '@/app/texts'
import { SimilarDataWarningIcon } from '@/shared/components/Icons'

import type { useCreateEvidenceFormStyles } from './useCreateEvidenceFormStyles'
import type { CreateEvidenceFormValues } from '../../schema'

const t = texts.createEvidence.form

type FormStyles = ReturnType<typeof useCreateEvidenceFormStyles>

export type CreateEvidenceFormFieldsProps = {
  register: UseFormRegister<CreateEvidenceFormValues>
  control: Control<CreateEvidenceFormValues>
  errors: FieldErrors<CreateEvidenceFormValues>
  inputSx: FormStyles['inputSx']
  errorFieldSx: FormStyles['errorFieldSx']
  inputMuted: string
  similarDataWarning: boolean
}

export function CreateEvidenceFormFields({
  register,
  control,
  errors,
  inputSx,
  errorFieldSx,
  inputMuted,
  similarDataWarning,
}: CreateEvidenceFormFieldsProps) {
  const inputRootSx = (inputSx as Record<string, object>)[
    '& .MuiOutlinedInput-root'
  ]

  return (
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
              ...inputRootSx,
              height: 40,
            },
            ...(similarDataWarning && !errors.occurrenceDateTime
              ? { '& .MuiFormHelperText-root': { color: inputMuted } }
              : {}),
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label={t.occurrenceChannel}
          value={t.occurrenceChannelNone}
          fullWidth
          size="small"
          disabled
          slotProps={{ input: { readOnly: true } }}
          sx={{
            ...inputSx,
            '& .MuiOutlinedInput-root': {
              height: 40,
              bgcolor: '#F7F7FB',
            },
            '& .MuiOutlinedInput-input': { color: '#A1A1A4' },
          }}
        />
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
              ...inputRootSx,
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
                      '& .MuiFormHelperText-root': { color: inputMuted },
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
  )
}
