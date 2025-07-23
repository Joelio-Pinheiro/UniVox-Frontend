import {useEffect, useRef, useState} from "react";
import Header from "../../layout/Header";
import UnivoxIcon from "../../assets/UnivoxIcon2.png";
import {Button} from "@mui/material";
import {ProfilePageHead} from "./ProfilePageHead";
import authService from "../../services/authService";
import {ProfileSection} from "./ProfileSection";
import {SectionBar} from "../../customComponents/SectionBar";
import {useNavigate} from "react-router-dom";

export function ProfilePage() {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  //avoids access by url when user has no active session
  // useEffect(() => {
  //   if (email == null) {
  //     return navigate("/");
  //   }
  // });

  let response;
  let content;

  const [section, setSection] = useState("posts");

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

  // async function apiRequest(userSection) {
  //   handleSectionChange(userSection);
  //   try {
  //     content = await authService.contentRequest(email, userSection);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

  const data = [
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
    {
      name: "Luiz Eduardo",
      pictureType: 2,
      rank: "prata",
      tags: "",
      likes: 1,
      dislikes: 0,
      text: "I like monkeys :)",
      date: "Publicado outro dia",
      id: "",
    },
  ];

  return (
    <div className="relative h-full w-full flex items-center sm:items-start md:items-start lg:items-start flex-col ml-0 lg:ml-2">
      <div className="relative h-full w-full lg:w-9/12 flex items-center flex-col gap-[1vh] bg-white">
        <ProfilePageHead
          //original profile will use props given by API request on page render
          // profilePic={header.picture}
          // userName={header.name}
          // profileDesc={header.desc}
          // rank={header.rank}
          // level={header.level}
          type={2}
          userName={"Lukizou"}
          profileDesc={"Eu trabalho bastante pro Javam"}
          rank={"cobre"}
          level={30}
        />

        <div className="relative w-11/12 h-min">
          <div className="relative w-full h-full grid grid-cols-4 gap-[2vh]">
            <Button
              className="!border-gray-500 !h-min"
              variant="text"
              size="small"
              onClick={() => handleSectionChange("posts")}>
              {<p className="text-xs text-gray-500">Postagens</p>}
            </Button>

            <Button
              className="!border-gray-500 !h-min"
              variant="text"
              size="small"
              onClick={() => handleSectionChange("comments")}>
              {<p className="text-xs text-gray-500">Comentários</p>}
            </Button>

            <Button
              className="!border-gray-500 !h-min"
              variant="text"
              size="small"
              onClick={() => handleSectionChange("liked")}>
              {<p className="text-xs text-gray-500">Likes</p>}
            </Button>

            <Button
              className="!border-gray-500 !h-min"
              variant="text"
              size="small"
              onClick={() => handleSectionChange("disliked")}>
              {<p className="text-xs text-gray-500">Deslikes</p>}
            </Button>
          </div>
          <SectionBar section={section} />
        </div>

        <ProfileSection data={data} section={section} />
      </div>
    </div>
  );
}
