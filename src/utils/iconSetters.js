import {
  AccountCircle,
  BorderColorOutlined,
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

//fornece ícones especificamente para alguns tipos de botões menores
export function buttonIconSetter(type) {
  switch (type) {
    case "likes":
      return <ThumbUpSharp />;
    case "dislikes":
      return <ThumbDownSharp />;
    case "comment":
      return <ChatBubbleOutlineOutlined />;
    case "options":
      return <MoreVert />;
    case "edit":
      return <BorderColorOutlined />;
    default:
      return;
  }
}

//fornece ícones dimensionados referentes ao rank do usuário
export function rankIconSetter(rank) {
  switch (rank) {
    case "cobre":
      return <MilitaryTech className="!h-3/4 !w-3/4" sx={{color: "#B87333"}} />;
    case "prata":
      return (
        <MilitaryTechOutlined
          className="!h-full !w-3/4"
          sx={{color: "#E5E4E2"}}
        />
      );
    case "ouro":
      return (
        <MilitaryTechRounded
          className="!h-full !w-3/4"
          sx={{color: "#FFD700"}}
        />
      );
    case "maximo":
      return (
        <WorkspacePremium className="!h-full !w-3/4" sx={{color: "#9C27B0"}} />
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
