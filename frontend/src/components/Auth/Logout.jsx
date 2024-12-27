// src/components/Auth/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';
import { Button } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      color="secondary"
      sx={{ ml: 2 }} // optional spacing or styling
    >
      Logout
    </Button>
  );
};

export default Logout;
