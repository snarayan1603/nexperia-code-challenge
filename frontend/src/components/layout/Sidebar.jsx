// src/components/Sidebar.jsx

import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Toolbar } from "@mui/material";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <Drawer
      variant="temporary" // or "permanent" if you want the sidebar always open
      open={isOpen}
      onClose={onClose}
      sx={{ "& .MuiDrawer-paper": { width: 240 } }}
    >
      {/* Optional: top spacing or a custom Toolbar */}
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItemButton
            component={Link}
            to="/" // or dynamic link
            onClick={onClose}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/campaign" // or dynamic link
            onClick={onClose}
          >
            <ListItemText primary="Campaign" />
          </ListItemButton>
          <ListItemButton component={Link} to="/upload-csv" onClick={onClose}>
            <ListItemText primary="Upload CSV" />
          </ListItemButton>
          <ListItemButton component={Link} to="/templates" onClick={onClose}>
            <ListItemText primary="Templates" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/ai-suggestions"
            onClick={onClose}
          >
            <ListItemText primary="AI Suggestions" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
