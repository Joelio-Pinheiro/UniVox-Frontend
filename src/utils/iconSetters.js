import {
  AccountCircle,
  ChatBubbleOutlineOutlined,
  Face2TwoTone,
  Face3TwoTone,
  Face6TwoTone,
  FaceUnlockTwoTone,
  LockRounded,
  Mail,
  MilitaryTech,
  MilitaryTechOutlined,
  MilitaryTechRounded,
  MoreVert,
  PhoneAndroid,
  ThumbDownSharp,
  ThumbUpSharp,
  Visibility,
  VisibilityOff,
  WorkspacePremium,
} from "@mui/icons-material";

//fornece ícones para input de texto baseado na propriedade name
export function inputIconSetter(name) {
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

//fornece ícones especificamente para alguns tipos de botões menores
export function buttonIconSetter(type) {
  switch (type) {
    case "likes":
      return <ThumbUpSharp sx={{ color: "black" }} />;
    case "dislikes":
      return <ThumbDownSharp sx={{ color: "black" }} />;
    case "comment":
      return <ChatBubbleOutlineOutlined sx={{ color: "black" }} />;
    case "options":
      return <MoreVert sx={{ color: "black" }} />;
    default:
      return;
  }
}

//fornece ícones dimensionados referentes ao rank do usuário
export function rankIconSetter(rank) {
  switch (rank) {
    case "cobre":
      return (
        <MilitaryTech className="!h-full !w-3/4" sx={{ color: "#B87333" }} />
      );
    case "prata":
      return (
        <MilitaryTechOutlined
          className="!h-full !w-3/4"
          sx={{ color: "#E5E4E2" }}
        />
      );
    case "ouro":
      return (
        <MilitaryTechRounded
          className="!h-full !w-3/4"
          sx={{ color: "#FFD700" }}
        />
      );
    case "maximo":
      return (
        <WorkspacePremium
          className="!h-full !w-3/4"
          sx={{ color: "#9C27B0" }}
        />
      );
    default:
      return;
  }
}

export function profileIconSetter(type) {
  switch (type) {
    case 1:
      return <FaceUnlockTwoTone className="!h-full !w-full" />;
    case 2:
      return <Face6TwoTone className="!h-full !w-full" />;
    case 3:
      return <Face2TwoTone className="!h-full !w-full" />;
    case 4:
      return <Face3TwoTone className="!h-full !w-full" />;
    default:
      return;
  }
}
