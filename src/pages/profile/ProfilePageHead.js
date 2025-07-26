import { profileIconSetter } from "../../utils/iconSetters";
import { ProfileRank } from "./ProfileRank";

export function ProfilePageHead({ type, userName, profileDesc, rank, level }) {
  return (
    <div className="relative flex flex-col w-11/12 h-1/4 gap-6 mt-2 sm:mt-0 md:mt-0 lg:mt-0">
      {/*foto e descrição de perfil */}
      <div className="relative flex items-center flex-row w-full h-3/5 gap-6">
        <div className="relative flex items-start flex-row w-2/12 sm:w-2/12 md:w-2/12 lg:w-2/12 h-min">
          {profileIconSetter(type)}
        </div>
        <div className="relative flex items-center flex-row w-full h-full">
          <div className="relative flex items-start flex-col w-full h-1/2 gap-2">
            <h1 className="text-3xl font-medium text-gray-900">{userName}</h1>
            <p className="text-2xl font-light text-gray-500">{profileDesc}</p>
          </div>
        </div>
      </div>

      <ProfileRank rank={rank} level={level} />
    </div>
  );
}
