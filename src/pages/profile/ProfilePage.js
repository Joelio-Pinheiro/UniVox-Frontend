import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SectionBar } from "../../customComponents/SectionBar";
import { ProfileSection } from "./ProfileSection";
import { ProfilePageHead } from "./ProfilePageHead";
import ProfileSectionsButton from "../../customComponents/buttons/ProfileSectionsButton";
import authService from "../../services/authService";

export function ProfilePage() {
  const routeParams = useParams();

  const [content, setContent] = useState([{}]);
  const [section, setSection] = useState("posts");
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);

        const user = await authService.getUserById(routeParams.id);
        setUserData(user);

      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
      }
    };

    fetchProfileData();
  }, [routeParams.id]);

  useEffect(() => {
    const fetchSectionContent = async () => {
      setIsLoading(true);
      try {
        const response = await authService.contentRequest(section);
        setContent(response);
      } catch (err) {
        console.error(`Error fetching ${section} content:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData.user_name) {
      // Only fetch content if user data has been loaded
      fetchSectionContent();
    }
  }, [section, userData.user_name]);

  function handleSectionChange(userSection) {
    if (section === userSection) {
      return;
    }

    setSection(userSection);
  }

  return (
    <div className="relative h-full w-full flex items-center sm:items-start md:items-start lg:items-start flex-col">
      {!isLoading && (
        <div className="relative h-full w-full flex items-center flex-col gap-[1vh] rounded-md shadow-lg border-gray-400 bg-white">
          <ProfilePageHead
            user={userData}
            userName={userData.user_name}
            profileDesc={userData.description}
            rank={userData.rank}
            level={userData.level}
          />

          <div className="relative w-full sm:w-11/12 md:w-11/12 lg:w-11/12 flex flex-col items-center h-min">
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
          </div>

          <SectionBar section={section} />
          <ProfileSection
            data={content}
            loading={isLoading}
            section={section}
          />
        </div>
      )}
    </div>
  );
}
