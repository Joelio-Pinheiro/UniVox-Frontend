import {
  AccountCircle,
  LockRounded,
  Mail,
  PhoneAndroid,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

//fornece ícones para input de texto baseado na propriedade name
export function IconSetter(name) {
  switch (name) {
    case "name":
      return <AccountCircle sx={{ color: "#106FE2" }} />;
    case "email":
      return <Mail sx={{ color: "#106FE2" }} />;
    case "contact_number":
      return <PhoneAndroid sx={{ color: "#106FE2" }} />;
    case "password":
      return <LockRounded sx={{ color: "#106FE2" }} />;
    case "password_confirmation":
      return <LockRounded sx={{ color: "#106FE2" }} />;
    case "visible":
      return <Visibility sx={{ color: "#808080" }} />;
    case "invisible":
      return <VisibilityOff sx={{ color: "#808080" }} />;
    default:
      return;
  }
}
