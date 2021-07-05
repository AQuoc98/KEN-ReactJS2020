import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue, amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ea3325",
      contrastText: '#fff',
    },
    secondary: {
      main: "#ea3325",
    },
  },
});

const DefaultThemeProvider = (props: any) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);

export default DefaultThemeProvider;
