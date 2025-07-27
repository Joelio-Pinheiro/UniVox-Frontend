import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionBar } from "../../customComponents/SectionBar";
import { ProfileSection } from "./ProfileSection";
import { ProfilePageHead } from "./ProfilePageHead";
import ProfileSectionsButton from "../../customComponents/buttons/ProfileSectionsButton";
import authService from "../../services/authService";

export function ProfilePage() {
  const navigate = useNavigate();

  const [content, setContent] = useState([{}]);
  const [section, setSection] = useState("posts");
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user_data"));

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
      setIsLoading(true);
      const response = await authService.contentRequest(userSection);
      setContent(response);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative h-full w-full flex items-center sm:items-start md:items-start lg:items-start flex-col">
      <div className="relative h-full w-full flex items-center flex-col gap-[1vh] rounded-md shadow-lg border-gray-400 bg-white">
        <ProfilePageHead
          user={user}
          userName={user.user_name}
          profileDesc={user.description}
          rank={user.rank}
          level={user.level}
        />

        <div className="relative w-11/12 h-min">
          <div className="relative w-full h-full grid grid-cols-4">
            <ProfileSectionsButton
              text={"Posts"}
              section={"posts"}
              sectionChange={() => handleSectionChange("posts")}
            />

            <ProfileSectionsButton
              text={"Comentários"}
              section={"comments"}
              sectionChange={() => handleSectionChange("comments")}
            />

            <ProfileSectionsButton
              text={"Likes"}
              section={"upvoted"}
              sectionChange={() => handleSectionChange("upvoted")}
            />

            <ProfileSectionsButton
              text={"Deslikes"}
              section={"downvoted"}
              sectionChange={() => handleSectionChange("downvoted")}
            />
          </div>
          <SectionBar section={section} />
        </div>

        <ProfileSection data={content} loading={isLoading} section={section} />
      </div>
    </div>
  );
}
