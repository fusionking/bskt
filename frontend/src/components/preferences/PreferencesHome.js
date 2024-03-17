import React from 'react';
import MainHome from '../home/MainHome';
import Preferences from './Preferences';
import Paper from '@mui/material/Paper';

const PreferencesHome = () => {
  return (
    <MainHome pageTitle="Preferences">
      <Paper sx={{ width: '250%', padding: 1, marginLeft: 1, backgroundColor: 'common.red' }}>
        <Preferences />
      </Paper>
    </MainHome>
  );
};

export default PreferencesHome;
