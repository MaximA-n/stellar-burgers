import React from 'react';
import { useSelector } from '../../services/store';
import { selectIsAuthChecked, selectUser } from '../../services/user/slice';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const Protected = ({
  onlyUnAuth = false,
  component
}: ProtectedProps): React.JSX.Element => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  // url: /profile, location: /profile, user: null, onlyUnAuth false
  // url: /login, state: /profile, user: null, onlyUnAuth true
  // url: /login, state: /profile, user: {}, onlyUnAuth true
  // url: /profile, location: /profile, user: {}, onlyUnAuth false
  // url: /profile, location: /profile, user: null, onlyUnAuth false

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (!onlyUnAuth && !user) {
    // For authenticated users, but not authenticated
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // For unauthenticated users, but authenticated
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // onlyUnAuth && !user for unauthenticated users, and not authenticated
  // !onlyUnAuth && user for authenticated users, and authenticated

  return component;
};
