import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/auth';

// MUI imports
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Link as MUILink
} from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await register(formData);
      if (res.data.message) {
        // Redirect to login after successful registration
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'background.paper'
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Register
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </Button>
          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <MUILink component={Link} to="/login" underline="hover">
              Login
            </MUILink>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
