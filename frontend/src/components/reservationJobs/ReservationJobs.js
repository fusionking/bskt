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
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const statusColors = {
  FAILED: 'error.main',
  COMPLETED: 'success.main',
  PENDING: 'background.paper',
  CANCELLED: 'error.secondary',
  APPROVED: 'secondary.secondary'
};

export default function ReservationsJobs() {
  const [reservationJobs, setReservationJobs] = useState([]);
  const [cancelled, setCancelled] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(async () => {
    const res = await ApiService.getReservationJobs();
    setReservationJobs(res);
  }, []);

  useEffect(async () => {
    const res = await ApiService.getReservationJobs();
    setReservationJobs(res);
  }, [cancelled, approved]);

  const cancel = async (id) => {
    await ApiService.cancelReservationJob(id);
    setCancelled(true);
    setApproved(false);
  };

  const approve = async (id) => {
    await ApiService.approveReservationJob(id);
    setApproved(true);
    setCancelled(false);
  };

  const displayReservationJobs = () => {
    if (setReservationJobs.length > 0) {
      return (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Slot Date</TableCell>
              <TableCell>Slot Time</TableCell>
              <TableCell>Complex</TableCell>
              <TableCell>Pitch</TableCell>
              <TableCell>Execution Type</TableCell>
              <TableCell>Execution Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Cancel</TableCell>
              <TableCell>Approve</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservationJobs.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {new Date(row.selection.slot.date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </TableCell>
                <TableCell>
                  {new Date(row.selection.slot.date).getHours()}:00-
                  {new Date(row.selection.slot.date).getHours() + 1}
                  :00
                </TableCell>
                <TableCell>{row.selection.sport_selection.complex_name}</TableCell>
                <TableCell>{row.selection.sport_selection.pitch_name}</TableCell>
                <TableCell>{row.execution_type}</TableCell>
                <TableCell>
                  {new Date(row.execution_time).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  })}{' '}
                  {new Date(row.execution_time).getHours()}:00-
                  {new Date(row.execution_time).getHours() + 1}
                  :00
                </TableCell>
                <TableCell
                  sx={{
                    color: statusColors[row.status]
                  }}>
                  <b>{row.status}</b>
                </TableCell>
                <TableCell>
                  {(row.status === 'PENDING' || row.status === 'APPROVED') && (
                    <IconButton
                      onClick={() => {
                        cancel(row.id);
                      }}>
                      <CancelIcon color="secondary.main" />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  {row.status === 'CANCELLED' && (
                    <IconButton
                      onClick={() => {
                        approve(row.id);
                      }}>
                      <CheckCircleIcon color="background.paper" />
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
      <Title>Reservation Jobs</Title>
      {displayReservationJobs()}
    </React.Fragment>
  );
}
