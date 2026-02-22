import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

export function EvidencePageSkeleton() {
  return (
    <Box display="flex" flexDirection="column" gap={'56px'}>
      <Box>
        <Skeleton variant="text" width={220} height={24} sx={{ mb: 2 }} />
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          <Table size="medium">
            <TableHead>
              <TableRow>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <TableCell key={i}>
                    <Skeleton variant="text" height={24} />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>
                    <Skeleton variant="text" height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rounded" width={80} height={24} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rounded" width={120} height={24} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" height={20} width={40} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Skeleton variant="text" width={200} height={24} />
          </Box>
        </TableContainer>
      </Box>
      <Box>
        <Skeleton variant="text" width={180} height={24} sx={{ mb: 2 }} />
        <Skeleton
          variant="rounded"
          width="100%"
          height={340}
          sx={{ borderRadius: '8px' }}
        />
      </Box>
    </Box>
  )
}
