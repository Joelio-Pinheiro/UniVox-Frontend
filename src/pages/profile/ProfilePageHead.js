import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import EditProfileButton from "../../customComponents/buttons/EditProfileButton";

export function ProfilePageHead({ user }) {
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    user_name: user.user_name,
    email: user.email,
    password: user.password,
    description: user.description,
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

  function handleEditConfirm() {}

  return (
    <div className="relative flex items-center flex-col w-full sm:w-11/12 md:w-11/12 lg:w-11/12 h-1/4 gap-2">
      {/*foto e descrição de perfil */}
      <div className="relative w-11/12 h-1/6">
        <EditProfileButton onClickFn={handleEditClick} />
      </div>

      <div className="relative flex items-center flex-row w-11/12 gap-2">
        <div className="relative flex items-start flex-row w-1/3 h-16 sm:h-32 md:h-32 lg:h-32 ">
          <Avatar className="!w-5/6 !h-5/6 ">
            {userInfo.user_name.charAt(1).toUpperCase()}
          </Avatar>
        </div>

        <div className="relative flex flex-row w-full h-full">
          <div className="relative flex flex-col w-full h-1/2 gap-1">
            <div className="rounded-sm border-gray-300">
              <h1 className="text-gray-500">{userInfo.name}</h1>
            </div>

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
            className="w-full h-min"
            label="Nome"
            variant="outlined"
            size="small"
            name={"name"}
            value={userInfo.name}
            onChange={handleChange}
          />
          <p className="text-end text-xs -mt-2 text-gray-500">
            {userInfo.name.length}/15
          </p>

          <TextField
            className="w-full h-min"
            label="Descrição"
            variant="outlined"
            size="small"
            name={"description"}
            value={userInfo.description}
            onChange={handleChange}
          />
          <p className="text-end text-xs -mt-2 text-gray-500">
            {userInfo.description.length}/300
          </p>

          <TextField
            className="w-full h-min"
            label="Nome de usuário"
            variant="outlined"
            size="small"
            name={"user_name"}
            value={userInfo.user_name}
            onChange={handleChange}
          />

          <TextField
            className="w-full h-min"
            label="Email"
            variant="outlined"
            size="small"
            name={"email"}
            value={userInfo.email}
            onChange={handleChange}
          />

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
