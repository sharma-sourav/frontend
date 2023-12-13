"use client"
import React, { useState } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { admin } from '../Redux/Slice';
import { useRouter } from 'next/dist/client/components/navigation';




const SignUp = () => {
 
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    allowExtraEmails: false,
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [emptyFields, setEmptyFields] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Remove the field from the emptyFields state when the user starts filling it
    if (value) {
      setEmptyFields({
        ...emptyFields,
        [name]: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmptyFields = {};
    let hasEmptyFields = false;
    for (const key in formData) {
      if (formData[key] === '') {
        newEmptyFields[key] = true;
        hasEmptyFields = true;
      } else {
        newEmptyFields[key] = false;
      }
    }

    setEmptyFields(newEmptyFields);

    if (hasEmptyFields) {
      Swal.fire('fill your All input Filds ');
    } 
    else  {console.log(' Data:', formData);
      dispatch(admin (formData));
      router.push('/login');}
     
    
  };

  return (
    <ThemeProvider theme={createTheme()}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  error={emptyFields.firstname}
                  helperText={emptyFields.firstname ? 'First Name is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={handleChange}
                  error={emptyFields.lastname}
                  helperText={emptyFields.lastname ? 'last Name is required' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  error={emptyFields.email}
                  helperText={emptyFields.email ? 'email is required' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  error={emptyFields.password}
                  helperText={emptyFields.password ? 'password is required' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="allowExtraEmails" color="primary" onChange={handleChange} />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>

                <Link href = '/login'>
                 Already have an account? Sign in 
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
