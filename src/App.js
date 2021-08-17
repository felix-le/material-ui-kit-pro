import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import {
  createStyles,
  createTheme,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core';
import ScrollReset from 'src/components/ScrollReset';
// import useSettings from 'src/hooks/useSettings';
import rtl from 'jss-rtl';
import Routes from 'src/Routes';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const defaultSettings = {
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: 'ONE_DARK',
};
const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
    },
  })
);
const history = createBrowserHistory();

function App() {
  useStyles();

  const settings = defaultSettings;

  return (
    <ThemeProvider theme={createTheme(settings)}>
      <StylesProvider jss={jss}>
        <Router history={history}>
          <ScrollReset />
          <Routes />
        </Router>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
