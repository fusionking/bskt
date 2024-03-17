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

const statusColors = {
  FAILED: 'error.main',
  COMPLETED: 'success.main',
  PENDING: 'background.paper',
  CANCELLED: 'error.secondary',
  APPROVED: 'secondary.secondary'
};

export default function Preferences() {
  const [preferences, setPreferences] = useState([]);

  useEffect(async () => {
    const res = await ApiService.getPreferences();
    setPreferences(res[0].selections);
  }, []);

  const displayPreferences = () => {
    if (preferences.length > 0) {
      return (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Branch</TableCell>
              <TableCell>Complex</TableCell>
              <TableCell>Pitch</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Reservation Job Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {preferences.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.sport_selection.branch_name}</TableCell>
                <TableCell>{row.sport_selection.complex_name}</TableCell>
                <TableCell>{row.sport_selection.pitch_name}</TableCell>
                <TableCell>
                  {new Date(row.slot.date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </TableCell>
                <TableCell>
                  {new Date(row.slot.date).getHours()}:00-{new Date(row.slot.date).getHours() + 1}
                  :00
                </TableCell>
                <TableCell
                  sx={{
                    color: statusColors[row.reservation_job_status]
                  }}>
                  <b>{row.reservation_job_status}</b>
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
      <Title>Preferences</Title>
      {displayPreferences()}
    </React.Fragment>
  );
}
