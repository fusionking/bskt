import * as React from 'react';
import Title from '../ui/Title';
import Typography from '@mui/material/Typography';

export default function About() {
  return (
    <React.Fragment>
      <Title>About</Title>
      <Typography variant="subtitle1" gutterBottom>
        Simply an add-to-basket app.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Basket Istanbul is an add-to-basket application. You will provide your slot preferences and
        it will simply try to reserve the preferred slot for you. This will happen either ASAP or in
        the future with a designated ETA.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Since Spor Istanbul opens slots for the upcoming 3 days, it will try to reserve a slot 3
        days before the original slot.
      </Typography>
    </React.Fragment>
  );
}
