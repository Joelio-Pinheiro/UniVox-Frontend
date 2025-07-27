import { useState } from "react";
import { profileIconSetter } from "../../utils/iconSetters";
import { TextField } from "@mui/material";
import EditProfileButton from "../../customComponents/buttons/EditProfileButton";

export function ProfilePageHead({
  pictureType,
  userName,
  profileDesc,
  rank,
  level,
}) {
  const [profileInfo, setProfileInfo] = useState({
    userName: userName,
    description: profileDesc,
    picture: pictureType,
  });

  const [editMode, setEditMode] = useState(false);

  function handleEditClick() {
    setEditMode(!editMode);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "name" && value.length === 21) {
      return;
    }

    if (name === "description" && value.length === 41) {
      return;
    }

    setProfileInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="relative flex items-center flex-col w-11/12 h-1/4 gap-6">
      {/*foto e descrição de perfil */}
      <div className="relative w-9/12 h-min">
        <EditProfileButton onClickFn={handleEditClick} />
      </div>

      <div className="relative flex items-center flex-row w-9/12 h-3/5 gap-6">
        <div className="relative flex items-start flex-row w-2/5 lg:w-1/5 h-min">
          {profileIconSetter(profileInfo.picture)}
        </div>

        <div className="relative flex flex-row w-full h-full">
          <div className="relative flex flex-col w-full h-1/2 gap-4">
            <TextField
              className="w-full h-min"
              variant={!editMode ? "standard" : "outlined"}
              size="small"
              name={"userName"}
              value={profileInfo.userName}
              disabled={!editMode}
              onChange={handleChange}
            />
            <p
              className={`text-end text-xs -mt-2 text-gray-500 ${
                editMode ? "block" : "hidden"
              }`}
            >
              {profileInfo.userName.length}/20
            </p>

            <TextField
              className="w-full h-min"
              variant={!editMode ? "standard" : "outlined"}
              size="small"
              name={"description"}
              value={profileInfo.description}
              disabled={!editMode}
              onChange={handleChange}
            />
            <p
              className={`text-end text-xs -mt-2 text-gray-500 ${
                editMode ? "block" : "hidden"
              }`}
            >
              {profileInfo.description.length}/40
            </p>
          </div>
        </div>
      </div>

      {/* <ProfileRank rank={rank} level={level} /> */}
    </div>
  );
}
