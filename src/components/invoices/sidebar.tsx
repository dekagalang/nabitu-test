"use client";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FileText, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      onClose();
    }
  };

  const content = (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
          InvoiceHub
        </Typography>
      </Box>
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.7)" }}>
          MENU
        </Typography>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={pathname === "/invoices/add"}
            onClick={() => handleNavigation("/invoices/add")}
          >
            <ListItemIcon>
              <Plus className="h-5 w-5 text-white" />
            </ListItemIcon>
            <ListItemText primary="Add Invoice" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={pathname === "/invoices/list"}
            onClick={() => handleNavigation("/invoices/list")}
          >
            <ListItemIcon>
              <FileText className="h-5 w-5 text-white" />
            </ListItemIcon>
            <ListItemText primary="My Invoices" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
        >
          {content}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
          open
        >
          {content}
        </Drawer>
      )}
    </Box>
  );
}
