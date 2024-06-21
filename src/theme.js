import { red, green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Changed to green
    },
    secondary: {
      main: '#ff5722', // Changed to deep orange
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Changed font family
    h1: {
      fontSize: '2.5rem', // Adjusted font size for headers
    },
    body1: {
      fontSize: '1.2rem', // Adjusted font size for body text
    },
  },
});

export default theme;
