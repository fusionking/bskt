import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ApiService from '../../services/ApiService';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const SignUp = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await ApiService.register({
      tckn: data.get('tckn'),
      password: data.get('password'),
      third_party_app_password: data.get('third_party_app_password'),
      email: data.get('email'),
      first_name: data.get('first_name'),
      last_name: data.get('last_name')
    });
    setIsRegistered(true);
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="tckn"
              label="TCKN"
              name="tckn"
              autoComplete="tckn"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="current-email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="third_party_app_password"
              label="Spor Istanbul Password"
              type="password"
              id="third_party_app_password"
              autoComplete="current-third-party-password"
            />
            <TextField
              margin="normal"
              fullWidth
              name="first_name"
              label="First Name"
              id="first_name"
              autoComplete="current-firstname"
            />
            <TextField
              margin="normal"
              fullWidth
              name="last_name"
              label="Last Name"
              id="last_name"
              autoComplete="current-lastname"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Container component="main" maxWidth="xs">
        {/*{isFailure && <Error />}*/}
      </Container>
      {isRegistered && <Navigate replace to="/" />}
    </>
  );
};

export default SignUp;
