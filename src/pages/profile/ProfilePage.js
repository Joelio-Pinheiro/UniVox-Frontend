import { useState } from "react";
import { Button } from "@mui/material";
import { ProfilePageHead } from "./ProfilePageHead";
import Header from "../../layout/Header"
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
    <div className="relative w-full h-screen">
      {/* <Header /> */}
      <div className="relative flex items-center flex-col w-full h-full bg-red-900">
        <div className="relative h-full w-full flex items-center flex-col gap-[4vh] sm:w-9/12 md:w-9/12 lg:w-9/12 bg-white border-2 border-gray-500 border-b-0 border-t-0">
          <ProfilePageHead
            profilePic={UnivoxIcon}
            userName={"Lukizou"}
            profileDesc={"Eu trabalho pro Javam"}
            rank={"prata"}
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
    </div>
  );
}
