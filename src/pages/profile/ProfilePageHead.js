import { ProfileRank } from "./ProfileRank";

export function ProfilePageHead({
  profilePic,
  userName,
  profileDesc,
  rank,
  level,
}) {
  return (
    <div className="relative flex flex-col w-full h-1/2 sm:w-9/12 md:w-9/12 lg:w-9/12">
      {/*foto e descrição de perfil */}
      <div className="relative flex items-center flex-row w-full h-3/5">
        <div className="relative flex items-start flex-row w-2/12 h-min">
            <img
              className="relative h-min w-min"
              src={profilePic}
              alt="profile_pic"
            />
        </div>
        <div className="relative flex items-center flex-row w-full h-full">
          <div className="relative flex items-start flex-col gap-[2vh] w-full h-1/2">
            <h1 className="text-3xl font-medium text-gray-900">{userName}</h1>
            <p className="text-2xl font-light text-gray-500">{profileDesc}</p>
          </div>
        </div>
      </div>

      <ProfileRank rank={rank} level={level} />
    </div>
  );
}
