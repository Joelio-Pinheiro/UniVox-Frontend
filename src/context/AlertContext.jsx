import React, { createContext, useContext, useState } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    severity: "info",
    message: "",
  });

  const show = (severity, message, duration = 4000) => {
    setAlert({ open: true, severity, message });

    if (duration > 0) {
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, open: false }));
      }, duration);
    }
  };

  const close = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ show }}>
      <Box
        position="fixed"
        top={20}
        right={20}
        zIndex={1500}
        maxWidth="400px"
        width="100%"
      >
        <Collapse in={alert.open}>
          <Alert
            severity={alert.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={close}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alert.message}
          </Alert>
        </Collapse>
      </Box>

      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
