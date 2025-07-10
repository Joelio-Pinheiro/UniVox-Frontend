import { LinearProgress } from "@mui/material";
import { rankIconSetter } from "../../utils/rankIconSetter";

export function ProfileRank({ rank, level }) {
  const userRank = rankIconSetter(rank);
  return (
    <div className="relative flex items-center flex-col w-full h-1/4 mt-10">
      <div className="relative flex items-center flex-row gap-6 w-full h-full">
        <div className="relative w-1/5 h-full rounded-md bg-gray-300">
          {userRank}
        </div>
        <div className="relative flex items-start flex-col gap-4 w-3/4 h-full">
          <p className="text-xl">{rank === "o-favorito" ? "Rank máximo" : "Seu rank é: " + rank}</p>

          <LinearProgress
            className="relative w-full !py-1.5 rounded-md"
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
            value={rank === "o-favorito" ? 100 : level}
          />
        </div>
      </div>
    </div>
  );
}
