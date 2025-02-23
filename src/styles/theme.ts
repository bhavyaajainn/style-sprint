import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#AC8968',
    },
    secondary: {
      main: '#93785B',
    },
    info:{
        main: "#fff"
    },
    background: {
      default: '#865d36',
    },
    
  },
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  spacing: 8,
});

// #3E362E, #A69080
export default theme;
