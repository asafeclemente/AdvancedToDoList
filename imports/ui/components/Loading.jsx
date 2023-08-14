import React from 'react';
import { Box, CircularProgress, Container, Stack } from '@mui/material';

export function Loading() {
  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <Stack spacing={8} align="center">
          <CircularProgress size={100} />
        </Stack>
      </Box>
    </Container>
  );
}