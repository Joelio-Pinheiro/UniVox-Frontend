import PostForm from "./PostForm";
import postService from "../../services/postService";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";

export function CreatePostPage() {
  const navigate = useNavigate();
  const { show } = useAlert();

  const handleSubmit = async ({ title, content, topics, is_anonymous }) => {
    try {
      const response = await postService.createPost(title, content, topics, is_anonymous);
      show("success", response.message || "Post criado com sucesso!");
      navigate("/");
    } catch (error) {
      show("error", error.message || "Erro ao criar o post.");
    }
  };

  return (
    <div className="flex flex-col bg-white justify-center sm:w-4/5 w-full p-4 mt-4 h-full gap-2 shadow-md rounded-xl border border-gray-200">
      <h1 className="text-2xl font-semibold mb-4">Criar post</h1>
      <PostForm onSubmit={handleSubmit} submitLabel="Postar" />
    </div>
  );
}