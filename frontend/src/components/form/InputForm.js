import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export const InputForm = ({ onSubmit }) => {
  const [court, setCourt] = useState('f64f68a6-7779-4f25-91d2-d7ee7ccda42e');

  // TODO: Get dynamically
  const courtIds = [
    { id: 'f64f68a6-7779-4f25-91d2-d7ee7ccda42e', name: 'Maltepe: Closed Court 1' },
    { id: 'b3d358ee-c85b-4773-89b5-2dc14e5bcd5f', name: 'Maltepe: Closed Court 2' },
    { id: 'f21006a3-26d9-480f-aa96-16b45a39e335', name: 'Maltepe: Closed Court 3' },
    { id: '88c91f40-ef33-42fc-a51f-9cf0e1912079', name: 'Maltepe: Closed Court 4' },
    { id: '6c93b9bb-1560-4cba-926a-3632d69a05fd', name: 'Maltepe: Open Court' },
    { id: '9939618f-2daa-4140-aa49-78263f623ec7', name: 'Sultanbeyli: Closed Court 1' },
    { id: 'eb82b08a-0bda-4e22-9a1d-30052c3cf891', name: 'Sultanbeyli: Closed Court 2' },
    { id: '02c31d8b-9172-4262-b8fc-1f633d0237ae', name: 'Sultanbeyli: Closed Court 3' }
  ];

  const onButtonPress = (event) => {
    event.preventDefault();
    onSubmit(court);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography component="h1" variant="h5">
            Select Court
          </Typography>
          <Box component="form" onSubmit={onButtonPress} noValidate sx={{ mt: 1 }}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="court-label">Court</InputLabel>
              <Select
                labelId="court-label"
                id="court"
                value={court}
                label="Select Court"
                onChange={(event) => setCourt(event.target.value)}>
                {courtIds.map((pitch) => (
                  <MenuItem key={pitch.id} value={pitch.id}>
                    {pitch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Select Court
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

InputForm.propTypes = {
  onSubmit: PropTypes.func
};
