import InteractionButton from "../../customComponents/buttons/InteractionButton";
import Content from "../../customComponents/Content";
import message from "../../messages.json";
import { profileIconSetter } from "../../utils/iconSetters";
import { rankIconSetter } from "../../utils/iconSetters";
export function ProfileSection({ section, data }) {
  let warningMessage = "";

  switch (section) {
    case "posts":
      warningMessage = message.emptyPostsSection;
      break;
    case "comments":
      warningMessage = message.emptyCommentsSection;
      break;
    case "liked":
      warningMessage = message.emptyLikesSection;
      break;
    case "disliked":
      warningMessage = message.emptyDeslikesSection;
      break;
    default:
      return;
  }
  return (
    <div className="relative w-full h-full flex items-center flex-col rounded-md bg-gray-300">
      {/*se não houver nada para mostrar, exibe mensagem de erro */}
      {data.length === 0 ? (
        <div className="relative w-full h-full">
          <p>{warningMessage}</p>
        </div>
      ) : (
        <div className="relative w-11/12 h-full">
          {data.map((item) => (
            <Content item={item} section={section}/>
          ))}
        </div>
      )}
    </div>
  );
}
