import { useState } from "react";
import { useAlert } from "../../context/AlertContext";
import Content from "../../customComponents/Content";
import postService from "../../services/postService";
import { emptySectionMessage } from "../../utils/messageSetters";
import Comment from "../detailPage/comment";

export function ProfileSection({ section, data, loading }) {
  const warningMessage = emptySectionMessage(section);
  const { show } = useAlert();

  const [postDetails, setPostDetails] = useState(null);

  const refreshPost = async (itemId) => {
    try {
      const updated = await postService.getPostById(itemId);
      setPostDetails(updated);
    } catch (error) {
      show("error", "Erro ao atualizar o post.");
    }
  };

  return (
    <div className="relative w-full h-full flex items-center flex-col rounded-md ">
      {/*se não houver nada para mostrar, exibe mensagem*/}
      {loading || data.length === 0 ? (
        <div className="relative w-full h-96 flex items-center flex-col rounded-md">
          <h1 className="text-gray-700 text-center font-semibold text-2xl mt-44">
            {warningMessage}
          </h1>
        </div>
      ) : section !== "comments" ? (
        <div className="relative w-11/12 h-full">
          {data.map((item) => (
            <Content itemId={item.id} section={section} />
          ))}
        </div>
      ) : (
        <div className="relative w-11/12 h-full">
          {data.map((item) =>
            item.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                postId={item.id}
                section={section}
                onUpdate={() => refreshPost(item.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
