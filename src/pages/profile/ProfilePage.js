import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionBar } from "../../customComponents/SectionBar";
import { ProfileSection } from "./ProfileSection";
import { ProfilePageHead } from "./ProfilePageHead";
import ProfileSectionsButton from "../../customComponents/buttons/ProfileSectionsButton";
import authService from "../../services/authService";

export function ProfilePage() {
  const navigate = useNavigate();

  let content;
  const user = JSON.parse(localStorage.getItem("user_data"));
  const [section, setSection] = useState("posts");

  useEffect(() => {
    if (user.email === "") {
      return navigate("/");
    }
  });

  function handleSectionChange(userSection) {
    if (section === userSection) {
      return;
    }

    setSection(userSection);
    apiRequest(userSection);
  }

  async function apiRequest(userSection) {
    try {
      content = await authService.contentRequest(userSection);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="relative h-full w-full flex items-center sm:items-start md:items-start lg:items-start flex-col">
      <div className="relative h-full w-full flex items-center flex-col gap-[1vh] rounded-md shadow-lg border-gray-400 bg-white">
        <ProfilePageHead
          pictureType={user.avatar_id}
          userName={user.name}
          profileDesc={user.description}
          rank={user.rank}
          level={user.level}
        />

        <div className="relative w-11/12 h-min">
          <div className="relative w-full h-full grid grid-cols-4">
            <ProfileSectionsButton
              text={"Posts"}
              section={"posts"}
              sectionChange={handleSectionChange}
            />

            <ProfileSectionsButton
              text={"Comentários"}
              section={"comments"}
              sectionChange={handleSectionChange}
            />

            <ProfileSectionsButton
              text={"Likes"}
              section={"upvoted"}
              sectionChange={handleSectionChange}
            />

            <ProfileSectionsButton
              text={"Deslikes"}
              section={"downvoted"}
              sectionChange={handleSectionChange}
            />
          </div>
          <SectionBar section={section} />
        </div>

        <ProfileSection data={content} section={section} />
      </div>
    </div>
  );
}
