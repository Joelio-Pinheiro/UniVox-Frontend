import message from "../messages.json";
export function emptySectionMessage(section) {
  switch (section) {
    case "posts":
      return message.warningMessages.emptyPostsSection;
    case "comments":
      return message.warningMessages.emptyCommentsSection;
    case "upvoted":
      return message.warningMessages.emptyLikesSection;
    case "downvoted":
      return message.warningMessages.emptyDeslikesSection;
    default:
      return "";
  }
}
