import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthGuard({ children }) {
  const account = {
    user: {
      avatar: '/static/images/avatars/avatar_6.png',
      bio: 'Sales Manager',
      canHire: false,
      country: 'USA',
      email: 'katarina.smith@devias.io',
      firstName: 'Katarina',
      id: '5e86809283e28b96d2d38537',
      isPublic: true,
      lastName: 'Smith',
      password: 'admin',
      phone: '+40 777666555',
      role: 'admin',
      state: 'New York',
      timezone: '4:32PM (GMT-4)',
    },
  };

  if (!account.user) {
    return <Redirect to='/login' />;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.any,
};

export default AuthGuard;
