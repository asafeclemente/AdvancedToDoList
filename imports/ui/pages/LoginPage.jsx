import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Meteor } from 'meteor/meteor';
import { Snackbar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
// import { LoginWithGithub } from './LoginWithGithub';
import { useUserId } from 'meteor/react-meteor-accounts';
import { Navigate, useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// TODO deal with com too-many-requests

export default function LoginPage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [username, setUsername] = useState('');
  const [userError, setUserError] = useState(false);
  const [password, setPassword] = useState('');

  const [isSignup, setIsSignup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const userId = useUserId();
  if (userId) {
    return <Navigate to="/home" />;
  }

  // const submit = e => {
  //   e.preventDefault();

  //   Meteor.loginWithPassword(username, password);
  // };

  function handleFocus() {
    inputRef.current.focus();
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleSubmit = e => {
    // Lógica de autenticação e cadastro
    e.preventDefault();
    if (isSignup) {
      Accounts.createUser({ username, password }, error => {
        if (error) {
          setUserError(true);
          if (error.reason === "Username already exists.") {
            setAlertMessage("Usuário já existe")
            console.log(alertMessage)
            setOpenSnackbar(true)
          }
          console.log("Erro no cadastro", error)
          handleFocus()
        }
        else {
          setAlertMessage("Cadastro realizado com sucesso")
          setOpenSnackbar(true)
          navigate('/home');
        }
      });
    } else {
      Meteor.loginWithPassword(username, password, error => {
        if (error) {
          setUserError(true);
          console.log("Erro no login", error)
          handleFocus()
        }
        else {
          navigate('/home');
        }
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            error={userError}
            value={username}
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value);
              setUserError(false);
            }}
            inputRef={inputRef}
          />
          <TextField
            margin="normal"
            fullWidth
            error={userError}
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
              setUserError(false)
            }}
          />
          {/* TODO
               <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
            color={isSignup ? "primary" : "secondary"}
          >
            {isSignup ? "Cadastro" : "Login"}
          </Button>
          {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={() => {
              setIsSignup(!isSignup);
              handleFocus()
            }}
          >
            {isSignup ? "Tenho uma conta" : "Criar uma conta"}
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose}
          severity={alertMessage==="Usuário já existe" ? "error" : "success"} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};