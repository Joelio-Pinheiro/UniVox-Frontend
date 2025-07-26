import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionBar } from "../../customComponents/SectionBar";
import { ProfileSection } from "./ProfileSection";
import { ProfilePageHead } from "./ProfilePageHead";
import ProfileSectionsButton from "../../customComponents/buttons/ProfileSectionsButton";
import authService from "../../services/authService";

export function ProfilePage() {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // avoids access by url when user has no active session
  // useEffect(() => {
  //   if (email === "") {
  //     return navigate("/");
  //   }
  // });

  let response;
  let content;

  
  //must find a way to only render header section data once
  // useEffect(() => {
    //   response = authService.userDataRequest();
    // }, []);
    
  const [section, setSection] = useState("posts");
  
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
      text: "Manel pai do ano ?",
      date: "27/06/2025",
      id: 2,
    },
    {
      name: "Luiz Felipe",
      pictureType: 2,
      rank: "prata",
      tags: "",
      likes: 1,
      dislikes: 0,
      text: "Eu gosto de macacos :)",
      date: "25/07/2024",
      id: 1,
    },
  ];

  return (
    <div className="relative h-full w-full flex items-center sm:items-start md:items-start lg:items-start flex-col ml-0 lg:ml-2">
      <div className="relative h-full w-full lg:w-9/12 flex items-center flex-col gap-[1vh] bg-white">
        <ProfilePageHead
          // original profile will use props given by API request on page render
          // profilePic={header.picture}
          // userName={header.name}
          // profileDesc={header.desc}
          // rank={header.rank}
          // level={header.level}
          pictureType={1}
          userName={"Jhon_Jhon"}
          profileDesc={"Estudante de finanças"}
          rank={"prata"}
          level={90}
        />

        <div className="relative w-full h-min">
          <div className="relative w-full h-full grid grid-cols-4 gap-[2vh]">
            <ProfileSectionsButton
              sectionChange={handleSectionChange}
              section={"posts"}
              text={"Postagens"}
            />

            <ProfileSectionsButton
              sectionChange={handleSectionChange}
              section={"comments"}
              text={"Comentários"}
            />

            <ProfileSectionsButton
              sectionChange={handleSectionChange}
              section={"liked"}
              text={"Likes"}
            />

            <ProfileSectionsButton
              sectionChange={handleSectionChange}
              section={"disliked"}
              text={"Deslikes"}
            />
          </div>
          <SectionBar section={section} />
        </div>

        <ProfileSection data={data} section={section} />
      </div>
    </div>
  );
}
