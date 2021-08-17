import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SlashScreen from 'src/components/SlashScreen';
import { setUserData, logout } from 'src/actions/accountActions';
