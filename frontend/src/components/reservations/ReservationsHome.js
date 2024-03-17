import React from 'react';
import MainHome from '../home/MainHome';
import Paper from '@mui/material/Paper';
import Reservations from './Reservations';

const ReservationsHome = () => {
  return (
    <MainHome pageTitle="Reservations">
      <Paper sx={{ width: '300%', padding: 1, marginLeft: 1, backgroundColor: 'common.green' }}>
        <Reservations />
      </Paper>
    </MainHome>
  );
};

export default ReservationsHome;
