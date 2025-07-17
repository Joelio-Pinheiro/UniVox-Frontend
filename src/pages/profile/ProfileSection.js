import message from "../../messages.json";
export function ProfileSection({ section, data }) {
  let warningMessage = "";

  switch (section) {
    case "posts":
      warningMessage = message.userProfileSections.emptyPostsSection;
      break;
    case "comments":
      warningMessage = message.userProfileSections.emptyCommentsSection;
      break;
    case "likes":
      warningMessage = message.userProfileSections.emptyLikesSection;
      break;
    case "deslikes":
      warningMessage = message.userProfileSections.emptyDeslikesSection;
      break;
    default:
      break;
  }
  
  return (
    <div>
      {data.length === 0 ? (
        <div>
          <p>{warningMessage}</p>
        </div>
      ) : (
        <div>{data.map()}</div>
      )}
    </div>
  );
}
