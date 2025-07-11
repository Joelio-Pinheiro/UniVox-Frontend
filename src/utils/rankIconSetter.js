import {
  MilitaryTech,
  MilitaryTechOutlined,
  MilitaryTechRounded,
  MilitaryTechTwoTone,
  WorkspacePremium,
} from "@mui/icons-material";

export function rankIconSetter(rank) {
  switch (rank) {
    case "cobre":
      return (
        <MilitaryTech className="!h-full !w-full" sx={{ color: "#b87333" }} />
      );
    case "prata":
      return (
        <MilitaryTechOutlined
          className="!h-full !w-full"
          sx={{ color: "#E5E4E2" }}
        />
      );
    case "ouro":
      return (
        <MilitaryTechRounded
          className="!h-full !w-full"
          sx={{ color: "gold" }}
        />
      );
    case "maximo":
      return (
        <WorkspacePremium
          className="!h-full !w-full"
          sx={{ color: "#9c27b0" }}
        />
      );
    default:
      return;
  }
}
