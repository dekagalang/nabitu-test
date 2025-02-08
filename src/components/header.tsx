"use client"

import { AppBar, Avatar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import { Bell, FileText, Menu } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
  isMobile: boolean
}

export default function Header({ onMenuClick, isMobile }: HeaderProps) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, color: "text.primary" }}
          >
            <Menu />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
          <IconButton size="small">
            <Bell className="h-5 w-5 text-gray-600" />
          </IconButton>
          <IconButton size="small">
            <FileText className="h-5 w-5 text-gray-600" />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                textAlign: "right",
                display: { xs: "none", sm: "block" },
              }}
            >
              <Typography variant="subtitle2" color="text.primary">
                John Doe
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Verified Member
              </Typography>
            </Box>
            <Avatar
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-08%20153527-ha5tKvi1KrbLJQEIaDOLz1BsjxxFIh.png"
              sx={{ width: 32, height: 32 }}
            />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

