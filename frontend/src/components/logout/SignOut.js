import * as React from 'react';
import Container from '@mui/material/Container';
import { inject, observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import Error from '../login/Error';

export const SignOut = inject('store')(
  observer(({ logOut, store }) => {
    const { isLoggedOut, isFailure } = store;

    const handleSubmit = () => {
      store.logout();
      logOut();
    };

    return (
      <>
        {handleSubmit()}
        <Container component="main" maxWidth="xs">
          {isFailure && <Error />}
        </Container>
        {isLoggedOut && <Navigate replace to="/signin" />}
      </>
    );
  })
);

export default SignOut;
