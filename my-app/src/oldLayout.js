import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  CssBaseline,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FileUpload from "./File"; // File Upload Component
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";

const drawerWidth = 200;

const Layout = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true); // Sidebar open by default on large screens
  const [selectedMenu, setSelectedMenu] = useState(null); // Default no component displayed

  // Toggle Sidebar for all screen sizes
  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
    setMobileOpen((prev) => !prev);
  };

  // Handle menu selection
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setMobileOpen(false); // Close drawer on mobile after selection
  };

  // Sidebar Drawer
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List  sx={{ paddingTop: 0 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick("fileUpload")}>
            <CloudUploadIcon sx={{ mr: 2 }} />
            <ListItemText primary="File Upload" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick("fileReading")}>
            <MenuBookIcon sx={{ mr: 2 }} />
            <ListItemText primary="File Reading" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuClick("fileW")}>
            <EditIcon sx={{ mr: 2 }} />
            <ListItemText primary="File Writing" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: "skyblue",color:'black', }}>
        <Toolbar>
          {/* Hamburger Menu Icon for Sidebar Toggle */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "block" } }} // Show on all screens
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" style={{ color: "black"}}>
            File Management
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu"
      >
        {/* Mobile Drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Permanent Sidebar for Larger Screens */}
        <Drawer
          variant="persistent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open={open} // Sidebar toggles on large screens
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          transition: "width 0.3s",
          mt: 8,
        }}
      >
        {selectedMenu === "fileUpload" && <FileUpload />}
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  window: PropTypes.func,
};

export default Layout;
