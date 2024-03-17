import React, { useEffect, useState } from 'react';
import './App.css';

import { SignIn } from './components/login/SignIn';
import StorageService from './services/StorageService';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import SlotsHome from './components/slots/SlotsHome';
import theme from './components/ui/Theme';
import { ThemeProvider } from '@mui/material/styles';
import PreferencesHome from './components/preferences/PreferencesHome';
import ReservationsHome from './components/reservations/ReservationsHome';
import SignUp from './components/signup/SignUp';
import AddPreference from './components/preferences/AddPreference';
import SignOut from './components/logout/SignOut';
import AboutHome from './components/about/AboutHome';
import ReservationJobsHome from './components/reservationJobs/ReservationJobsHome';

function App() {
  const [userLogged, setUserLogged] = useState(StorageService.getToken('basket_token'));

  useEffect(() => {
    if (userLogged) {
      localStorage.setItem('userLogged', JSON.stringify(1));
    } else {
      localStorage.removeItem('userLogged');
    }
  }, [userLogged]);

  const logIn = () => setUserLogged(true);
  const logOut = () => setUserLogged(false);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/signin" element={<SignIn logIn={logIn} />} />
        <Route path="/signout" element={<SignOut logOut={logOut} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/slots"
          element={
            <ProtectedRoute>
              <SlotsHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preferences"
          element={
            <ProtectedRoute>
              <PreferencesHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <ReservationsHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-preference"
          element={
            <ProtectedRoute>
              <AddPreference />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservation-jobs"
          element={
            <ProtectedRoute>
              <ReservationJobsHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
