import { LinearProgress } from "@mui/material";
import { rankIconSetter } from "../../utils/rankIconSetter";

export function ProfileRank({ rank, level }) {
  const userRank = rankIconSetter(rank);
  return (
    <div className="relative flex items-center flex-col w-full h-1/4">
      <div className="relative flex items-start flex-row gap-6 w-full h-full">
        <div className="relative w-2/12 h-full flex items-center flex-col rounded-md bg-gray-300">
          {userRank}
        </div>
        <div className="relative flex items-start flex-col gap-4 w-3/4 h-full mt-4">
          <p className="text-xl">
            {rank === "maximo" ? "Rank máximo" : "Seu rank é: " + rank}
          </p>

          <LinearProgress
            className="relative w-8/12 !py-1.5 rounded-md"
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
