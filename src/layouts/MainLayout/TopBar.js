import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Hidden,
  Typography,
  Link,
  makeStyles,
} from '@material-ui/core';
import { APP_VERSION } from 'src/config';
import Logo from 'src/components/Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  toolbar: {
    height: 64,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& +&': {
      marginLeft: theme.spacing(2),
    },
    divider: {
      width: 1,
      height: 32,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
}));

function TopBar({ className, ...rest }) {
  const classes = useStyles();
  return (
    <AppBar color='default' {...rest} className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to='/home'>
          <Logo className={classes.logo} />
        </RouterLink>
        <Hidden mdDown>
          <Typography variant='caption' color='textSecondary'>
            Version
            {APP_VERSION}
          </Typography>
        </Hidden>
        <Box flexGrow={1} />
        <Link
          className={classes.link}
          color='textSecondary'
          to='#!'
          component='a'
          underline='none'
          variant='body2'
        >
          Dashboard
        </Link>
        <Link
          className={classes.link}
          to='#!'
          component='a'
          underline='none'
          variant='body2'
          color='textSecondary'
        >
          Documentation
        </Link>
        <Divider className={classes.divider} />
        <Button
          color='secondary'
          component='a'
          variant='contained'
          size='small'
          href='/'
        >
          Get the kit
        </Button>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
};
export default TopBar;
