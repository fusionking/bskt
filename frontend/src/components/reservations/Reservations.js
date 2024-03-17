import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../ui/Title';
import { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';
import Empty from '../ui/Empty';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const statusColors = {
  FAILED: 'error.main',
  IN_CART: 'success.main',
  EXPIRED: 'common.brown',
  REMOVED_FROM_BASKET: 'background.paper',
  PAID: 'common.successGreen'
};

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [removed, setRemoved] = useState(false);

  useEffect(async () => {
    const res = await ApiService.getReservations();
    setReservations(res);
  }, []);

  useEffect(async () => {
    const res = await ApiService.getReservations();
    setReservations(res);
  }, [removed]);

  const removeFromBasket = async (id) => {
    await ApiService.removeFromBasket({ id: id });
    setRemoved(true);
  };

  const displayReservations = () => {
    if (reservations.length > 0) {
      return (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Complex</TableCell>
              <TableCell>Pitch</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Remove From Basket</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ width: '12em' }}>
                  {new Date(row.selection.slot.date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </TableCell>
                <TableCell sx={{ width: '12em' }}>
                  {new Date(row.selection.slot.date).getHours()}:00-
                  {new Date(row.selection.slot.date).getHours() + 1}
                  :00
                </TableCell>
                <TableCell sx={{ width: '12em' }}>
                  {row.selection.sport_selection.complex_name}
                </TableCell>
                <TableCell sx={{ width: '12em' }}>
                  {row.selection.sport_selection.pitch_name}
                </TableCell>
                <TableCell
                  sx={{
                    color: statusColors[row.status],
                    width: '12em'
                  }}>
                  <b>{row.status}</b>
                </TableCell>
                <TableCell>
                  {row.status === 'IN_CART' && (
                    <IconButton
                      onClick={() => {
                        removeFromBasket(row.id);
                      }}>
                      <RemoveCircleIcon color="secondary.main" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else {
      return <Empty />;
    }
  };

  return (
    <React.Fragment>
      <Title>Reservations</Title>
      {displayReservations()}
    </React.Fragment>
  );
}
