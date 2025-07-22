import {LinearProgress} from "@mui/material";
import {rankIconSetter} from "../../utils/iconSetters";

export function ProfileRank({rank, level}) {
  const userRank = rankIconSetter(rank);
  return (
    <div className="relative w-full h-1/4 flex items-center flex-col">
      <div className="relative w-full h-full flex items-start flex-row gap-6">
        <div className="relative w-2/12 sm:w-2/12 md:w-2/12 lg:w-1/12 h-full flex items-center flex-col rounded-md bg-gray-300">
          {userRank}
        </div>
        <div className="relative flex items-start flex-col gap-4 w-3/4 h-full mt-0 sm:mt-2 md:mt-2 lg:mt-2">
          <p className="text-xl">
            {rank === "maximo" ? "Rank máximo" : "Seu rank é: " + rank}
          </p>

          <LinearProgress
            className="relative w-10/12 !py-1.5 rounded-md"
            color={
              rank === "cobre"
                ? "warning"
                : rank === "prata"
                ? "primary"
                : rank === "ouro"
                ? "error"
                : "secondary"
            }
            variant="determinate"
            value={rank === "maximo" ? 100 : level}
          />
        </div>
      </div>
    </div>
  );
}
