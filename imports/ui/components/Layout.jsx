// import { Navbar } from './Navbar';
import { Navigate } from 'react-router-dom';
// import { Footer } from './Footer';
import React from 'react';
import { useUser, useUserId } from 'meteor/react-meteor-accounts';
import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@mui/material';
import { Logout } from './Drawer/Logout';

export function Layout({ loggedOnly = true, children }) {
  const userId = useUserId();
  const username = useUser()?.username;

  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      }, 
      secondary: {
        main: green[500],
      },
    },
  });


  if (loggedOnly && !userId) {
    return <Navigate to="/"/>;
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <Navbar/> */}
      <Logout/>
			Navbar TODO userId: {username}<br></br> 
      {children}
			<br></br>
      Footer TODO
      {/* <Footer/> */}
      </ThemeProvider>
  );
}
