import {
  AccountCircle,
  LockRounded,
  Mail,
  MilitaryTech,
  MilitaryTechOutlined,
  MilitaryTechRounded,
  PhoneAndroid,
  Visibility,
  VisibilityOff,
  WorkspacePremium,
} from "@mui/icons-material";

//fornece ícones para input de texto baseado na propriedade name
export function iconSetter(name) {
  switch (name) {
    case "nome":
      return <AccountCircle sx={{color: "#106FE2"}} />;
    case "email":
      return <Mail sx={{color: "#106FE2"}} />;
    case "telefone":
      return <PhoneAndroid sx={{color: "#106FE2"}} />;
    case "senha":
      return <LockRounded sx={{color: "#106FE2"}} />;
    case "confirma_senha":
      return <LockRounded sx={{color: "#106FE2"}} />;
    case "visivel":
      return <Visibility sx={{color: "#808080"}} />;
    case "invisivel":
      return <VisibilityOff sx={{color: "#808080"}} />;
    default:
      return;
  }
}

export function buttonIconSetter() {}

export function rankIconSetter(rank) {
  switch (rank) {
    case "cobre":
      return <MilitaryTech className="!h-3/4 !w-3/4" sx={{color: "#b87333"}} />;
    case "prata":
      return (
        <MilitaryTechOutlined
          className="!h-full !w-3/4"
          sx={{color: "#E5E4E2"}}
        />
      );
    case "ouro":
      return (
        <MilitaryTechRounded className="!h-full !w-3/4" sx={{color: "gold"}} />
      );
    case "maximo":
      return (
        <WorkspacePremium className="!h-full !w-3/4" sx={{color: "#9c27b0"}} />
      );
    default:
      return;
  }
}
