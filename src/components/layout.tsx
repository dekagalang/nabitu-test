"use client"

import { Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material"
import Header from "./header"
import Sidebar from "./sidebar"
import type React from "react"
import { useState } from "react"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a2236",
    },
    background: {
      default: "#f8f9fc",
    },
  },
})

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header onMenuClick={handleDrawerToggle} isMobile={isMobile} />
          <Box
            component="main"
            sx={{
              flex: 1,
              p: { xs: 2, sm: 3 },
              overflow: "auto",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

