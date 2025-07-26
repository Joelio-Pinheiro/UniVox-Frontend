import { useState } from "react";
import { profileIconSetter } from "../../utils/iconSetters";
import { ProfileRank } from "./ProfileRank";
import TextInputComponent from "../../customComponents/inputs/TextInputComponent";
import EditProfileButton from "../../customComponents/buttons/EditProfileButton";
import { TextField } from "@mui/material";

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
    <div className="relative flex flex-col w-11/12 h-1/4 gap-6 mt-2 sm:mt-0 md:mt-0 lg:mt-0">
      {/*foto e descrição de perfil */}
      <div className="relative w-full h-min">
        <EditProfileButton onClickFn={handleEditClick} />
      </div>

      <div className="relative flex items-center flex-row w-full h-3/5 gap-6">
        <div className="relative flex items-start flex-row w-2/12 sm:w-2/12 md:w-2/12 lg:w-2/12 h-min">
          {profileIconSetter(profileInfo.picture)}
        </div>
        <div className="relative flex flex-row w-full h-full">
          <div className="relative flex flex-col w-full md:w-9/12 lg:w-9/12 h-1/2 gap-4">
            <TextField
              className="w-full h-min"
              disabled={!editMode}
              name={"userName"}
              value={profileInfo.userName}
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
              disabled={!editMode}
              name={"description"}
              value={profileInfo.description}
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

      <ProfileRank rank={rank} level={level} />
    </div>
  );
}
