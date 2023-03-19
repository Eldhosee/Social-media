import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route {...rest} element={isLoggedIn ? <Component /> : <Navigate to="/" />} />
  );
};

export default AuthRoute;
