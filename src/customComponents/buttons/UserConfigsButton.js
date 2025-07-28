import { SettingsOutlined } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { inputIconSetter } from "../../utils/iconSetters";

export default function UserConfigsButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { show } = useAlert();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "edit-account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <SettingsOutlined sx={{ color: "gray" }} />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="edit-account-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/emailfornewpass/email-change")}>
          {inputIconSetter("email")}
          Alterar email
        </MenuItem>

        <MenuItem onClick={() => navigate("/emailfornewpass/password-change")}>
          {inputIconSetter("password")} Alterar senha
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
