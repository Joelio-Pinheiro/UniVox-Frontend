import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { ProfilePageHead } from "./ProfilePageHead";
import Header from "../../layout/Header";
import UnivoxIcon from "../../assets/UnivoxIcon2.png";
import authService from "../../services/authService";
import { ProfileSection } from "./ProfileSection";

export function ProfilePage() {
  let response;
  let content;
  const email = localStorage.getItem("email");
  const [section, setSection] = useState("posts");

  //must find a way to only render header section data once
  useEffect(() => {
    response = authService.userDataRequest();
  }, []);

  function handleSectionChange(userSection) {
    if (section === userSection) {
      return;
    }
    setSection(userSection);
  }

  async function apiRequest(userSection) {
    handleSectionChange(userSection);
    try {
      content = await authService.contentRequest(email, userSection);
    } catch (err) {
      console.log(err.message);
    }
  }
  
  return (
    <div className="relative h-full w-full flex items-center flex-col ml-2 sm:ml-4 md:ml-4 lg:ml-4">
      <div className="relative h-full w-9/12 flex flex-col gap-[4vh] bg-white">
        <ProfilePageHead
          //original profile will use props given by API request on page render
          // profilePic={header.picture}
          // userName={header.name}
          // profileDesc={header.desc}
          // rank={header.rank}
          // level={header.level}
          profilePic={UnivoxIcon}
          userName={"Lukizou"}
          profileDesc={"Eu trabalho pro Javam (por enquanto)"}
          rank={"cobre"}
          level={30}
        />

        <div className="relative flex items-center flex-col w-full h-max sm:w-9/12 md:w-9/12 lg:w-9/12">
          <div className="relative w-full h-full grid grid-cols-4 gap-[4vh]">
            <Button
              className="!border-gray-500 !w-1/2"
              variant="outlined"
              onClick={() => apiRequest("posts")}
            >
              {<p className="text-xs text-gray-500">Postagens</p>}
            </Button>

            <Button
              className="!border-gray-500"
              variant="outlined"
              onClick={() => apiRequest("comments")}
            >
              {<p className="text-xs text-gray-500">Comentários</p>}
            </Button>

            <Button
              className="!border-gray-500"
              variant="outlined"
              onClick={() => apiRequest("liked")}
            >
              {<p className="text-xs text-gray-500">Curtidos</p>}
            </Button>

            <Button
              className="!border-gray-500"
              variant="outlined"
              onClick={() => apiRequest("desliked")}
            >
              {<p className="text-xs text-gray-500">Não Curtidos</p>}
            </Button>

            
            <ProfileSection data={content.data} section={section}/>
          </div>
        </div>
      </div>
    </div>
  );
}
