"use client";

import { Alert, type AlertColor, Snackbar } from "@mui/material";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  subMessage?: string;
  severity?: AlertColor;
}

export default function Toast({
  open,
  onClose,
  message,
  subMessage,
  severity = "success",
}: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
          minWidth: "300px",
          backgroundColor:
            severity === "success" ? "rgb(229, 255, 241)" : undefined,
          color: severity === "success" ? "rgb(14, 156, 85)" : undefined,
          "& .MuiAlert-icon": {
            color: severity === "success" ? "rgb(14, 156, 85)" : undefined,
          },
        }}
      >
        <div>
          {message}
          {subMessage && (
            <div
              style={{ fontSize: "0.875rem", marginTop: "4px", opacity: 0.8 }}
            >
              {subMessage}
            </div>
          )}
        </div>
      </Alert>
    </Snackbar>
  );
}
