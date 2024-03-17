import React from 'react';
import MainHome from '../home/MainHome';
import Paper from '@mui/material/Paper';
import About from './About';

const AboutHome = () => {
  return (
    <MainHome pageTitle="About">
      <Paper sx={{ width: '95%', padding: 1, marginLeft: 1, backgroundColor: 'background.paper' }}>
        <About />
      </Paper>
    </MainHome>
  );
};

export default AboutHome;
