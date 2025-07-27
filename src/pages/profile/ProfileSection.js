import Content from "../../customComponents/Content";
import message from "../../messages.json";

export function ProfileSection({ section, data }) {
  let warningMessage = "";
  
  switch (section) {
    case "posts":
      warningMessage = message.warningMessages.emptyPostsSection;
      break;
    case "comments":
      warningMessage = message.warningMessages.emptyCommentsSection;
      break;
    case "upvoted":
      warningMessage = message.warningMessages.emptyLikesSection;
      break;
    case "downvoted":
      warningMessage = message.warningMessages.emptyDeslikesSection;
      break;
    default:
      return;
  }
  return (
    <div className="relative w-full h-full flex items-center flex-col rounded-md bg-gray-300">
      {/*se não houver nada para mostrar, exibe mensagem de erro */}
      {!data || data.length === 0 ? (
        <div className="relative w-full h-96 flex items-center flex-col rounded-md bg-white">
          <h1 className="text-gray-700 text-center font-semibold text-2xl mt-44">
            {warningMessage}
          </h1>
        </div>
      ) : (
        <div className="relative w-11/12 h-full">
          {data.map((item) => (
            <Content item={item} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}
