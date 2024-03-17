import React from 'react';
import MainHome from '../home/MainHome';
import Paper from '@mui/material/Paper';
import ReservationJobs from './ReservationJobs';

const ReservationJobsHome = () => {
  return (
    <MainHome pageTitle="Reservation Jobs">
      <Paper sx={{ width: '250%', padding: 1, marginLeft: 1, backgroundColor: 'common.green' }}>
        <ReservationJobs />
      </Paper>
    </MainHome>
  );
};

export default ReservationJobsHome;
