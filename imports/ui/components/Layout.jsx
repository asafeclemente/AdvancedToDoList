import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Navigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Container, CssBaseline, Tooltip } from '@mui/material';
import { useUser, useUserId } from 'meteor/react-meteor-accounts';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import Drawer from './Drawer/Drawer';

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/asafemedeiros/">
        Asafe Medeiros
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export function Layout({ loggedOnly = true, children }) {
  const navigate = useNavigate();

  const logout = () => {
    Meteor.logout(() => {
      navigate('/');
    });
  };

  const userId = useUserId();
  const username = useUser()?.username;

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const theme = createTheme({
    // palette: {
    //   primary: {
    //     main: purple[500],
    //   },
    //   secondary: {
    //     main: green[500],
    //   },
    // },
  });

  if (loggedOnly && !userId) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              AdvancedTodoList - {username}
            </Typography>
            <Tooltip title="Deslogar">
              <IconButton color="inherit"
                onClick={() => logout()}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer open={open} drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>


  );
}
