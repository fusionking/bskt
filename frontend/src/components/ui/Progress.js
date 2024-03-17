import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Progress() {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <CircularProgress color="secondary" display="flex" justifyContent="center" />
      </Paper>
    </Grid>
  );
}
