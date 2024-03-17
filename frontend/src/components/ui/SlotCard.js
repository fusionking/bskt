import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActions, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import ApiService from '../../services/ApiService';
import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';

const statusColors = {
  'Başkasının Rezervasyonu': 'error.main',
  'Başkasının Sepetinde': 'warning.main',
  Reservable: 'primary.main',
  'Reservable ETA': 'common.green'
};

export const SlotCard = ({ slotsResult }) => {
  const [isReserveClicked, setIsReserveClicked] = useState(false);

  const onClickHandler = async (slotData) => {
    const slotDate = `${slotData.date} ${slotData.slot.split(' -')[0]}`;
    await ApiService.reserve({
      selection: {
        slot: {
          date: slotDate,
          event_target: slotData.event_target
        },
        sport_selection: {
          pitch_id: slotData.pitchId
        }
      }
    });
    setIsReserveClicked(true);
  };

  const displayCard = (dayData, courtId) => {
    return (
      <React.Fragment>
        {isReserveClicked && <Navigate to="/reservation-jobs" />}
        <CardContent>
          <Typography variant="h5" component="div">
            {dayData.day} - {dayData.date}
          </Typography>
          {dayData.slots.map((slotData) => (
            <CardContent key={slotData.id} component="div">
              <Paper elevation={3}>
                <Typography
                  component="h6"
                  sx={{ backgroundColor: 'secondary.main' }}
                  display="flex"
                  justifyContent="center">
                  {slotData.slot}
                </Typography>
                <Typography
                  component="p"
                  display="flex"
                  justifyContent="center"
                  variant={'subtitle2'}
                  sx={{
                    color: statusColors[slotData.status]
                  }}>
                  {slotData.status}
                </Typography>
                <CardActions display="flex" justifyContent="center">
                  {slotData.is_reservable && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() =>
                        onClickHandler({ pitchId: courtId, date: dayData.date, ...slotData })
                      }>
                      Reserve
                    </Button>
                  )}
                </CardActions>
              </Paper>
            </CardContent>
          ))}
        </CardContent>
      </React.Fragment>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" component="div" display="flex" justifyContent="center">
          {slotsResult.court}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {slotsResult.slots.map((dayData) => (
          <Grid container spacing={24} key={dayData.id}>
            <Grid item xs={12}>
              <Box
                key={dayData.id}
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 1,
                  p: 2,
                  mb: 2,
                  //maxWidth: 600,
                  width: 'inherit'
                }}
                display="flex"
                justifyContent="center">
                <Card variant="outlined">{displayCard(dayData, slotsResult.court_id)}</Card>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

SlotCard.propTypes = {
  slotsResult: PropTypes.object
};
