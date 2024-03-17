import { createTheme } from '@mui/material';

const green = '#739E82';
const darkGreen = '#326439';
const darkGreenAlt = '#073d0e';
const greenLight = '#E7EFE9';
const rawSiena = '#D38B5D';
// const rawSienaShade = '#D8976F';
// const goldenBrown = '#99621E';
const goldenBrownShade = '#AA6D22';
const ivory = '#fbfdf6';
const darkRed = '#934925';
const error = '#7c0000';
const successGreen = '#a0ff00';

const theme = createTheme({
  palette: {
    mode: 'light',
    common: {
      red: `${rawSiena}`,
      green: `${green}`,
      brown: `${goldenBrownShade}`,
      successGreen: `${successGreen}`
    },
    primary: {
      main: `${darkGreen}`,
      light: `${greenLight}`
    },
    secondary: {
      main: `${rawSiena}`,
      secondary: `${darkGreenAlt}`
    },
    background: {
      paper: `${ivory}`
    },
    grey: {
      900: '#6c6c6c',
      100: '#d2d2d2'
    },
    success: {
      main: `${darkGreen}`
    },
    error: {
      main: `${darkRed}`,
      secondary: `${error}`
    }
  },
  typography: {
    fontSize: 15
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          maxWidth: 'none'
        }
      }
    }
  }
});

export default theme;
