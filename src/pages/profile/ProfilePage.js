import { useState } from "react";
import { Button } from "@mui/material";
import { ProfilePageHead } from "./ProfilePageHead";
import Header from "../../layout/Header";
import UnivoxIcon from "../../assets/UnivoxIcon2.png";

export function ProfilePage() {
  const [section, setSection] = useState("posts");

  function sectionBtnClick(userSection) {
    if (section === userSection) {
      return;
    }
    setSection(userSection);
  }

  return (
    <div className="relative flex items-center flex-col w-full h-full">
      {/* <Header /> */}
      <div className="relative h-full w-9/12 flex items-center flex-col gap-[4vh] bg-white">
        <ProfilePageHead
          profilePic={UnivoxIcon}
          userName={"Lukizou"}
          profileDesc={"Eu trabalho pro Javam (por enquanto)"}
          rank={"maximo"}
          level={30}
        />

        <div className="relative flex items-center flex-col w-full h-max">
          <div className="relative w-10/12 grid grid-cols-3 gap-[4vh]">
            <Button
              className="!border-gray-500 !py-1 !px-4"
              variant="outlined"
              onClick={() => sectionBtnClick("posts")}
            >
              {<p className="text-lg text-gray-500">Postagens</p>}
            </Button>

            <Button
              className="!border-gray-500 !py-1 !px-4"
              variant="outlined"
              onClick={() => sectionBtnClick("comments")}
            >
              {<p className="text-lg text-gray-500">Comentários</p>}
            </Button>

            <Button
              className="!border-gray-500 !py-1 !px-4"
              variant="outlined"
              onClick={() => sectionBtnClick("likes")}
            >
              {<p className="text-lg text-gray-500">Curtidos</p>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
