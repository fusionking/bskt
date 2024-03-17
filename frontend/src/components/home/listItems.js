import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import InfoIcon from '@mui/icons-material/Info';
import { Collapse } from '@mui/material';
import List from '@mui/material/List';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import WorkIcon from '@mui/icons-material/Work';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={Link} to="/about">
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItemButton>
    <NestedList></NestedList>
    <ListItemButton component={Link} to="/slots">
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="Slots" />
    </ListItemButton>
    <ListItemButton component={Link} to="/signout">
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItemButton>
  </React.Fragment>
);

function NestedList() {
  const [open, setOpen] = React.useState(true);
  const [resOpen, setResOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleResClick = () => {
    setResOpen(!resOpen);
  };

  return (
    <>
      <ListItemButton component={Link} to="/preferences" onClick={handleClick}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Preferences" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/add-preference" sx={{ pl: 4 }}>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Add Preference" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton component={Link} to="/reservations" onClick={handleResClick}>
        <ListItemIcon>
          <EventSeatIcon />
        </ListItemIcon>
        <ListItemText primary="Reservations" />
        {resOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={resOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/reservation-jobs" sx={{ pl: 4 }}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Reservation Jobs" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
