import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Preferences from '../preferences/Preferences';
import Reservations from '../reservations/Reservations';
import MainHome from './MainHome';

function DashboardContent() {
  return (
    <MainHome pageTitle="Dashboard">
      {/* Recent Preferences */}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'common.red',
            width: '200%'
          }}>
          <Preferences />
        </Paper>
      </Grid>
      {/* Recent Reservations */}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'common.green',
            width: '200%'
          }}>
          <Reservations />
        </Paper>
      </Grid>
    </MainHome>
  );
}

export default function Home() {
  return <DashboardContent />;
}
