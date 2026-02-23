import { Box, Paper, Typography, useTheme } from '@mui/material'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import '@/app/theme/theme-augment'

import { texts } from '@/app/texts'

import type { SubmissionsByActivityDataPoint } from './types'

type ChartDataKey = keyof Omit<SubmissionsByActivityDataPoint, 'date'>

const getLegendOrder = (): ChartDataKey[] =>
  (texts.myEvidence.chartLegendOrder as ChartDataKey[]) ?? []

type SubmissionsByActivityChartProps = {
  data?: SubmissionsByActivityDataPoint[]
}

export function SubmissionsByActivityChart({
  data = [],
}: SubmissionsByActivityChartProps) {
  const theme = useTheme()
  const legendOrder = getLegendOrder()
  const custom = (
    theme.palette as {
      custom?: {
        filterBoxBorder?: string
        olive?: string
        chartManutencaoConta?: string
        chartPix?: string
        chartSaque?: string
      }
    }
  ).custom

  const borderColor = custom?.filterBoxBorder
  const legendLabels = texts.myEvidence.chartLegend
  const barColors: Record<string, string> = {
    aberturaConta: theme.palette.primary.main,
    contratacaoCredito: theme.palette.warning.main,
    manutencaoConta: custom?.chartManutencaoConta ?? '',
    pagamento: theme.palette.error.main,
    pix: custom?.chartPix ?? '',
    saque: custom?.chartSaque ?? '',
    transferencia: custom?.olive ?? '',
  }

  const dataWithZeros = data.map((d) => ({
    ...d,
    aberturaConta: d.aberturaConta ?? 0,
    contratacaoCredito: d.contratacaoCredito ?? 0,
    manutencaoConta: d.manutencaoConta ?? 0,
    pagamento: d.pagamento ?? 0,
    pix: d.pix ?? 0,
    saque: d.saque ?? 0,
    transferencia: d.transferencia ?? 0,
  }))

  return (
    <Box mb={4}>
      <Typography
        component="h2"
        sx={{
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '24px',
          letterSpacing: 0,
          color: 'text.primary',
          mb: 2,
        }}
      >
        {texts.myEvidence.submissionsByActivityTitle}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          width: 1120,
          maxWidth: '100%',
          height: 454,
          borderRadius: '8px',
          border: '1px solid',
          borderColor,
          overflow: 'hidden',
          p: 2,
          bgcolor: 'background.paper',
          boxSizing: 'border-box',
        }}
      >
        <ResponsiveContainer width="100%" height={422}>
          <BarChart
            data={dataWithZeros}
            margin={{ top: 20, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              stroke={theme.palette.grey[300]}
              horizontal
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{
                fontSize: 12,
                fill: theme.palette.text.primary,
                fontFamily: theme.typography.fontFamily,
                fontWeight: 400,
              }}
              tickMargin={8}
              axisLine={{ stroke: theme.palette.grey[300] }}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              domain={[0, 25]}
              ticks={[0, 5, 10, 15, 20, 25]}
              tick={{
                fontSize: 12,
                fill: theme.palette.text.primary,
                fontFamily: theme.typography.fontFamily,
                fontWeight: 400,
              }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="top"
              wrapperStyle={{
                position: 'relative',
              }}
              formatter={(value) => (
                <span
                  style={{
                    fontFamily: theme.typography.fontFamily,
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: '18px',
                    letterSpacing: 0,
                    textAlign: 'center',
                    color: theme.palette.text.primary,
                  }}
                >
                  {legendLabels[value as keyof typeof legendLabels] ?? value}
                </span>
              )}
              iconType="square"
              iconSize={10}
            />
            {legendOrder.map((dataKey) => (
              <Bar
                key={dataKey}
                dataKey={dataKey}
                stackId="a"
                fill={barColors[dataKey]}
                name={dataKey}
                radius={[0, 0, 0, 0]}
                barSize={16}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  )
}
