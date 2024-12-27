// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";

const Header = ({ toggleDrawer }) => {
  const navigate = useNavigate();

  // Check if token is present
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    // Clear token or perform any logout logic
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  console.log(isLoggedIn);

  return (
    <AppBar position="static">
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            Nexperia
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar>
        {/* Left side: Menu Icon */}
        <IconButton color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" component="div">
          Nexperia
        </Typography>

        {/* Spacer to push buttons to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right side: Conditionally show Sign In or Logout */}
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleSignIn}>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
