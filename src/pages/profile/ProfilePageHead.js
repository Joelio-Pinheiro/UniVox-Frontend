import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import EditProfileButton from "../../customComponents/buttons/EditProfileButton";
import { useAlert } from "../../context/AlertContext";
import authService from "../../services/authService";
import UserConfigsButton from "../../customComponents/buttons/UserConfigsButton";
import { BorderColorOutlined } from "@mui/icons-material";

export function ProfilePageHead({ user }) {
  const { show } = useAlert();
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    userName: user.user_name,
    email: user.email,
    description: user.description,
    password: "",
    newPassword: "",
  });

  const [editMode, setEditMode] = useState(false);

  function handleEditClick() {
    setEditMode(!editMode);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "name" && value.length > 15) {
      return;
    }

    if (name === "description" && value.length > 300) {
      return;
    }

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEditConfirm() {
    apiRequest();
  }

  async function apiRequest() {
    try {
      await authService.updateProfile(userInfo);
    } catch (error) {
      show("error", `Erro ao editar perfi: ${error.message}`);
    }
  }

  return (
    <div className="relative flex items-center flex-col w-full sm:w-11/12 md:w-11/12 lg:w-11/12 gap-2">
      <div className="relative w-11/12 h-1/6 flex justify-end">
        <UserConfigsButton />
      </div>

      <div className="relative flex items-center flex-row w-11/12 gap-2">
        <div className="relative flex items-center flex-col gap-4 w-9/12 sm:w-1/3 md:w-1/2 lg:w-1/4 md:h-40 lg:h-40 h-32">
          <Avatar className="!w-1/2 !h-1/2">
            {userInfo.userName.charAt(1)}
          </Avatar>

          <button
            className="w-full border-2 rounded-md bg-gray-300"
            onClick={handleEditClick}
          >
            <p className="text-base font-normal text-black">Editar perfil</p>
          </button>
        </div>

        <div className="relative flex flex-row w-full h-full">
          <div className="relative flex flex-col w-full md:h-40 lg:h-40 h-32 gap-1">
            <div className="rounded-sm border-gray-300">
              <p className="text-black font-semibold text-2xl">
                {userInfo.name}
              </p>
            </div>

            <Divider />

            <div className="rounded-sm border-gray-300 h-16">
              <p className="text-gray-500">
                {userInfo.description !== "" ? userInfo.description : "..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal open={editMode} onClose={() => setEditMode(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
          <Typography variant="h6">Editar perfil</Typography>

          <TextField
            variant="outlined"
            size="small"
            label="Nome de usuário"
            name={"userName"}
            value={userInfo.userName}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            size="small"
            label="Nome"
            name={"name"}
            value={userInfo.name}
            onChange={handleChange}
          />
          <p className="text-end text-xs -mt-2 text-gray-500">
            {userInfo.name.length}/15
          </p>

          <TextField
            className=""
            variant="outlined"
            label="Descrição"
            name={"description"}
            value={userInfo.description}
            onChange={handleChange}
          />
          <p className="text-end text-xs -mt-2 text-gray-500">
            {userInfo.description.length}/300
          </p>

          <div className="flex justify-end gap-2">
            <Button variant="outlined" onClick={() => setEditMode(false)}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={() => handleEditConfirm}>
              Salvar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
