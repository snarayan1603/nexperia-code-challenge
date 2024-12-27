// src/components/DarkThemeLayout.jsx
import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const drawerWidth = 240;

function DarkThemeLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Determine if viewport is below 'md' breakpoint (e.g. ~960px)
  const isMobile = useMediaQuery(darkTheme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // Decide drawer variant: 'permanent' on desktop, 'temporary' on mobile
  const drawerVariant = isMobile ? "temporary" : "permanent";

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

  // The actual sidebar (drawer) content
  const drawerContent = (
    <List>
      {/* Instead of <a href="...">, use <Link to="..."> */}
      <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/campaign"
        onClick={handleDrawerToggle}
      >
        <ListItemText primary="Campaign" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/upload-csv"
        onClick={handleDrawerToggle}
      >
        <ListItemText primary="Upload CSV" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/templates"
        onClick={handleDrawerToggle}
      >
        <ListItemText primary="Templates" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/ai-suggestions"
        onClick={handleDrawerToggle}
      >
        <ListItemText primary="AI Suggestions" />
      </ListItemButton>
    </List>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

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

      {/* Sidebar Drawer */}
      <Drawer
        variant={drawerVariant}
        open={isMobile ? mobileOpen : true} // 'true' for permanent on desktop
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {/* Give the AppBar some vertical space */}
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>{drawerContent}</Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` }, // push content aside for the drawer
        }}
      >
        <Toolbar />
        {/* Renders nested routes */}
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default DarkThemeLayout;
