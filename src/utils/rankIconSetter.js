import {
  MilitaryTech,
  MilitaryTechOutlined,
  MilitaryTechRounded,
  MilitaryTechTwoTone,
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
          sx={{ color: "silver" }}
        />
      );
    case "ouro":
      return (
        <MilitaryTechRounded
          className="!h-full !w-full"
          sx={{ color: "gold" }}
        />
      );
    case "o-favorito":
      return (
        <MilitaryTechTwoTone className="!h-full !w-full" sx={{ color: "blueviolet" }} />
      );
    default:
      return;
  }
}
