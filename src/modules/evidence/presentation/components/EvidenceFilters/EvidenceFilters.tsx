import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'

import '@/app/theme/theme-augment'

import { texts } from '@/app/texts'
import { SearchIcon } from '@/shared/components/Icons/SearchIcon'

export type EvidenceFiltersValues = {
  transactionId: string
  classification: string
}

export type EvidenceFiltersProps = {
  onApply?: (values: EvidenceFiltersValues) => void
  onClear?: () => void
}

const t = texts.myEvidence

export function EvidenceFilters({ onApply, onClear }: EvidenceFiltersProps) {
  const theme = useTheme()
  const custom = (
    theme.palette as {
      custom?: { filterBoxBorder?: string; inputMuted?: string }
    }
  ).custom
  const filterBoxBorder = custom?.filterBoxBorder ?? '#DEDEE2'
  const inputMuted = custom?.inputMuted ?? '#A1A1A4'

  const [transactionId, setTransactionId] = useState('')
  const [classification, setClassification] = useState('')

  const handleApply = () => {
    onApply?.({
      transactionId: transactionId.trim(),
      classification: classification.trim(),
    })
  }

  const handleClear = () => {
    setTransactionId('')
    setClassification('')
    onClear?.()
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: '12px',
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
          }}
        >
          {t.filterTitle}
        </Typography>
        <Typography
          component="button"
          type="button"
          onClick={handleClear}
          sx={{
            fontWeight: 600,
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: 0,
            color: 'primary.main',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {t.clearFilters}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          width: '1120px',
          maxWidth: '100%',
          height: 72,
          padding: '16px',
          border: '1px solid',
          borderColor: filterBoxBorder,
          borderRadius: '8px',
          bgcolor: 'background.paper',
        }}
      >
        <TextField
          placeholder={t.transactionIdPlaceholder}
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          size="small"
          sx={{
            width: 534,
            '& .MuiOutlinedInput-root': {
              height: 40,
              border: '1px solid',
              borderColor: inputMuted,
              borderRadius: 1,
              fontWeight: 400,
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: 0,
              color: 'text.primary',
              '& fieldset': { border: 'none' },
              '& input::placeholder': { color: inputMuted, opacity: 1 },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ color: inputMuted }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl
          size="small"
          sx={{
            width: 360,
            '& .MuiOutlinedInput-root': { height: 40 },
            '& .MuiInputLabel-root, & .MuiSelect-select': {
              color: inputMuted,
            },
          }}
        >
          <InputLabel id="evidence-filter-classification">
            {t.classificationPlaceholder}
          </InputLabel>
          <Select
            labelId="evidence-filter-classification"
            value={classification}
            label={t.classificationPlaceholder}
            onChange={(e) => setClassification(e.target.value)}
          >
            <MenuItem value="">{t.classificationOptions.all}</MenuItem>
            <MenuItem value="fraudAttempt">
              {t.classificationOptions.fraudAttempt}
            </MenuItem>
            <MenuItem value="fraudOccurrence">
              {t.classificationOptions.fraudOccurrence}
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApply}
          sx={{
            width: 154,
            height: 40,
            fontWeight: 600,
            fontSize: 16,
            lineHeight: '24px',
            textTransform: 'none',
          }}
        >
          {t.applyButton}
        </Button>
      </Box>
    </Box>
  )
}
