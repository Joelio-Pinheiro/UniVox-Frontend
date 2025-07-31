import { LinearProgress } from "@mui/material";
import { rankIconSetter } from "../../utils/iconSetters";

export function ProfileRank({ rank, level }) {
  const userRank = rankIconSetter(rank);
  return (
    <div className="relative w-9/12 h-1/4 flex items-center flex-col mb-2 ">
      <div className="relative w-full h-full flex items-start flex-row gap-6">
        <div className="relative w-2/12 lg:w-1/12 h-full flex items-center flex-col rounded-md bg-slate-800">
          {userRank}
        </div>
        <div className="relative flex items-start flex-col gap-4 w-full h-full">
          <p className="text-xl">
            {rank === "maximo" ? "Rank máximo" : "Seu rank é: " + rank}
          </p>

          <LinearProgress
            className="relative w-full !py-1 -mt-4 rounded-md"
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
