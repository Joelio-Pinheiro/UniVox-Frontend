import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { MdDarkMode } from "react-icons/md";
import ThemeButton from "./ThemeButton";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function BasicMenu() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userFields, setUserFields] = React.useState();
  const open = Boolean(anchorEl);
  const { show } = useAlert();

  const user = JSON.parse(localStorage.getItem("user_data")) ?? null;
  const sessionId = JSON.parse(localStorage.getItem("session_id")) ?? null;

  React.useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const fields = await authService.getUserSession(sessionId);
        setUserFields(fields);
      } catch (err) {
        console.error("Erro ao obter dados do usuário", err);
      }
    };

    fetchProfileData();
  }, [sessionId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function logout() {
    handleClose();
    try {
      const response = await authService.logout();
      localStorage.removeItem("email");
      show("success", response.message || "Deslogado com sucesso!");
      navigate("/login");
    } catch (error) {
      show("error", "Erro ao deslogar");
    }
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar>{userFields ? userFields.user_name.charAt(1) : ""}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
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
        <MenuItem
          onClick={() =>
            navigate(
              `/profile/${JSON.parse(localStorage.getItem("session_id"))}`
            )
          }
        >
          <Avatar /> Perfil
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <MdDarkMode className="text-2xl" />
          </ListItemIcon>
          <div className="flex items-center justify-between w-full gap-2">
            <span>Modo Escuro</span>
            <ThemeButton size="small" />
          </div>
        </MenuItem>

        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
