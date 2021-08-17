import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

function GuestGuard({ children }) {
  const defaultAccount = {
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

  const account = {
    ...defaultAccount,
  };
  console.log(
    '🚀 ~ file: GuestGuard.js ~ line 25 ~ GuestGuard ~ account',
    account
  );

  if (account.user) {
    return <Redirect to='/app/account' />;
  }

  return children;
}

GuestGuard.propTypes = {
  children: PropTypes.any,
};
export default GuestGuard;
