import { ProfileRank } from "./ProfileRank";

export function ProfilePageHead({ profilePic, userName, profileDesc, rank, level }) {
  return (
    <div className="relative flex items-center flex-col w-10/12 h-1/2 mt-12">
      {/*foto e descrição de perfil */}
      <div className="relative flex items-center flex-row w-full h-3/5">
        <div className="relative flex items-center flex-row w-5/12 h-full">
          <div className="relative w-9/12 h-9/12 rounded-md bg-gray-800">
            <img
              className="relative h-min w-min"
              src={profilePic}
              alt="profile_pic"
            />
          </div>
        </div>

        <div className="relative flex items-start flex-col gap-[2vh] w-full h-full mt-12">
          <h1 className="text-3xl font-medium text-gray-900">{userName}</h1>
          <p className="text-2xl font-light text-gray-500">{profileDesc}</p>
        </div>
      </div>

      <ProfileRank rank={rank} level={level} />
    </div>
  );
}
