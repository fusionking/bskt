import * as React from 'react';
import Typography from '@mui/material/Typography';

function Empty() {
  return (
    <Typography component="p" variant="p" color="primary" gutterBottom>
      There are no items yet
    </Typography>
  );
}

export default Empty;
