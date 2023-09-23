import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { red } from "@mui/material/colors";

// Create a theme instance.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

function Login({ handleLogin, username, password, setUsername, setPassword }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box
            component='form'
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='username'
              name='username'
              autoComplete='username'
              autoFocus
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;

// <div>
// <form onSubmit={handleLogin}>
//   <h2>Login to application</h2>
//   <div>
//     username
//     <input
//       type='text'
//       id='username'
//       value={username}
//       name='Username'
//       onChange={({ target }) => setUsername(target.value)}
//     />
//   </div>
//   <div>
//     password
//     <input
//       id='password'
//       type='password'
//       value={password}
//       name='Password'
//       onChange={({ target }) => setPassword(target.value)}
//     />
//   </div>
//   <button type='submit'>login</button>
