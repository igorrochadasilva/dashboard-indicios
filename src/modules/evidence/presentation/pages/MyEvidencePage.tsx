import { Box, Container, Typography } from '@mui/material'

export function MyEvidencePage() {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Meus indícios
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Página de listagem de indícios. Conteúdo em construção.
        </Typography>
      </Box>
    </Container>
  )
}
