import {useEffect, useRef, useState} from "react";
import Header from "../../layout/Header";
import UnivoxIcon from "../../assets/UnivoxIcon2.png";
import {Button} from "@mui/material";
import {ProfilePageHead} from "./ProfilePageHead";
import authService from "../../services/authService";
import {ProfileSection} from "./ProfileSection";

export function ProfilePage() {
  let response;
  let content;
  const email = localStorage.getItem("email");
  const [section, setSection] = useState("likes");

  //must find a way to only render header section data once
  // useEffect(() => {
  //   response = authService.userDataRequest();
  // }, []);

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

  let data = [
    {
      name: "Guilherme Monteiro",
      pictureType: 1,
      rank: "maximo",
      tags: "",
      likes: 2,
      dislikes: 2,
      text: "Emanuel father of the year fr fr",
      date: "Publicado algum dia",
      id: "",
    },
    // {
    //   name: "Luiz Eduardo",
    //   picture: 2,
    //   rank: "prata",
    //   tags: "",
    //   likes: 1,
    //   dislikes: 0,
    //   text: "I like monkeys :)",
    //   date: "Publicado outro dia",
    //   id: "",
    // },
  ];

  return (
    <div className="relative h-full w-full flex items-center flex-col ml-0 sm:ml-4 md:ml-4 lg:ml-4">
      <div className="relative h-full w-full/12 sm:w-9/12 md:w-9/12 lg:w-9/12 flex items-center sm:items-start md:items-start lg:items-start flex-col gap-[1vh] bg-white">
        <ProfilePageHead
          //original profile will use props given by API request on page render
          // profilePic={header.picture}
          // userName={header.name}
          // profileDesc={header.desc}
          // rank={header.rank}
          // level={header.level}
          type={2}
          userName={"Lukizou"}
          profileDesc={"Eu trabalho pro Javam (por enquanto)"}
          rank={"cobre"}
          level={30}
        />

        <div className="relative flex items-center flex-col w-11/12 h-max sm:w-9/12 md:w-9/12 lg:w-9/12">
          <div className="relative w-full h-full grid grid-cols-4 gap-[2vh]">
            <Button
              className="!border-gray-500"
              variant="outlined"
              onClick={() => apiRequest("posts")}>
              {<p className="text-xs text-gray-500">Postagens</p>}
            </Button>

            <Button
              className="!border-gray-500"
              variant="outlined"
              onClick={() => apiRequest("comments")}>
              {<p className="text-xs text-gray-500">Comentários</p>}
            </Button>

            <Button
              className="!border-gray-500"
              variant="outlined"
              onClick={() => apiRequest("liked")}>
              {<p className="text-xs text-gray-500">Curtidos</p>}
            </Button>

            <Button
              className="!border-gray-500"
              variant="outlined"
              onClick={() => apiRequest("desliked")}>
              {<p className="text-xs text-gray-500">Não Curtidos</p>}
            </Button>
          </div>
        </div>

        <ProfileSection data={data} section={section} />
      </div>
    </div>
  );
}
