import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router'

import { PlusIcon } from '../Icons/PlusIcon'

export type PageHeaderProps = {
  title: string
  actionLabel?: string
  actionTo?: string
}

export function PageHeader({ title, actionLabel, actionTo }: PageHeaderProps) {
  const showAction = Boolean(actionLabel && actionTo)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontWeight: 600,
          fontSize: 20,
          lineHeight: '30px',
          letterSpacing: 0,
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>
      {showAction && actionTo && actionLabel && (
        <Button
          component={Link}
          to={actionTo}
          variant="contained"
          color="primary"
          startIcon={<PlusIcon />}
          sx={{
            width: 158,
            height: 40,
            fontWeight: 600,
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: 0,
            color: 'primary.contrastText',
            textTransform: 'none',
            '& .MuiButton-startIcon': {
              marginRight: 1,
              color: 'inherit',
            },
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  )
}
