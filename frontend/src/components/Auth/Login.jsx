import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/auth';

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

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/upload-csv');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
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
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
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
            sx={{ mt: 1 }}
          >
            Login
          </Button>
          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <MUILink component={Link} to="/register" underline="hover">
              Register
            </MUILink>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
