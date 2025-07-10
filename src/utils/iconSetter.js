import {
  AccountCircle,
  LockRounded,
  Mail,
  PhoneAndroid,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

//fornece ícones para input de texto baseado na propriedade name
export function iconSetter(name) {
  switch (name) {
    case "nome":
      return <AccountCircle sx={{ color: "#106FE2" }} />;
    case "email":
      return <Mail sx={{ color: "#106FE2" }} />;
    case "telefone":
      return <PhoneAndroid sx={{ color: "#106FE2" }} />;
    case "senha":
      return <LockRounded sx={{ color: "#106FE2" }} />;
    case "confirma_senha":
      return <LockRounded sx={{ color: "#106FE2" }} />;
    case "visivel":
      return <Visibility sx={{ color: "#808080" }} />;
    case "invisivel":
      return <VisibilityOff sx={{ color: "#808080" }} />;
    default:
      return;
  }
}
