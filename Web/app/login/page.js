"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Slice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Correct import

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // State for form input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleLogin = async () => {
    setError(''); // Clear any previous error

    if (email === '' || password === '') {
      setError('Fields are empty');
    } else {
      const userData = { email, password };
      try {
        const data = await dispatch(login(userData));
        // if(status === 201){
        console.log("sourav: ", data);
        if(data.payload !== undefined){
          console.log('Logged in user data:', userData);
          router.push('DashBoard'); // Replace with the actual URL
        }
        else console.log("user not found");
        // }
        // else{
        //   alert("User not found");
        // }

      } catch (error) {
        console.error('Login failed:', error);
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button onClick={handleLogin} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/Signup">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
