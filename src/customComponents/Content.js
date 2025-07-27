import { useEffect, useState } from "react";
import InteractionButton from "./buttons/InteractionButton";
import postService from "../services/postService";
import { useAlert } from '../context/AlertContext';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import Comment from "../pages/detailPage/comment";
import TopicActionsBox from "./TopicActionsBox";
import PostForm from "../pages/createPost/PostForm";

export default function Content({ itemId, section, isFeed = false }) {
  const navigate = useNavigate();
  const { show } = useAlert();
  const [postDetails, setPostDetails] = useState(null);
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const [isEditOpen, setEditOpen] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const handleEditPost = async () => {
    try {
      await postService.updatePost(
        itemId,
        editTitle,
        editContent,
        postDetails.topics?.map((t) => t.id) || [],
        postDetails.is_anonymous || false
      );
      show("success", "Post atualizado com sucesso!");
      setEditOpen(false);
      refreshPost();
    } catch (err) {
      show("error", "Erro ao editar o post.");
    }
  };


  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const data = await postService.getPostById(itemId);
        setPostDetails(data);
      } catch (error) {
        show("error", `Erro ao carregar detalhes do post`);
      }
    };

    fetchPostDetails();
  }, [itemId, show]);
  const refreshPost = async () => {
    try {
      const updated = await postService.getPostById(itemId);
      setPostDetails(updated);
    } catch (error) {
      show("error", "Erro ao atualizar o post.");
    }
  };


  const handleVote = async (voteType) => {
    try {
      await postService.likePost(itemId, "post", voteType);
      const updated = await postService.getPostById(itemId);
      setPostDetails(updated);
    } catch (error) {
      show("error", "Erro ao votar no post.");
    }
  };
  const handleCreateComment = async () => {
    try {
      await postService.CreateComment(itemId, commentContent);
      setCommentOpen(false);
      setCommentContent("");
      const updated = await postService.getPostById(itemId);
      setPostDetails(updated);
      show("success", "Comentário criado com sucesso!");
    } catch (error) {
      show("error", "Erro ao comentar.");
    }
  };

  if (!postDetails) {
    return (
      <div className="bg-white border border-gray-300 rounded-xl p-4 mb-4 w-screen max-w-xl shadow-sm animate-pulse">
        <p className="text-gray-400">Carregando post...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full bg-white border border-gray-300 rounded-xl p-4 mb-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(`/profile/${postDetails.creator.id}`)}
        >
          <Avatar>{postDetails.creator.user_name.charAt(1)}</Avatar>
          <span className="font-semibold text-sm">{postDetails.creator.user_name}</span>
        </div>
        <TopicActionsBox
          post={postDetails}
          onEdit={(post) => {
            setEditTitle(post.title);
            setEditContent(post.content);
            setEditOpen(true);
          }}
          onDelete={async (id) => {
            try {
              await postService.deletePost(id);
              show("success", "Post deletado com sucesso!");

              if (!isFeed && section === "comments") {
                navigate("/");
              } else {
                window.location.reload(); 
              }
            } catch (err) {
              show("error", "Erro ao deletar o post.");
            }
          }}

        />

      </div>

      <div className="flex flex-col cursor-pointer"
        onClick={() => isFeed ? navigate(`/posts/${postDetails.id}`) : null}>
        {/* Título */}
        <Typography variant="h6" component="h6" className="!font-semibold !text-gray-900"
        >{postDetails.title}</Typography>

        {/* Corpo em Markdown */}
        <div data-color-mode="light" className="prose prose-sm max-w-full text-sm text-gray-800 mb-2 p-2">
          <MDEditor.Markdown source={postDetails.content} />
        </div>
      </div>

      {/* Tópicos */}
      <div className="flex flex-wrap gap-1 mb-2">
        {postDetails.topics?.map((tag) => (
          <span
            key={tag.id}
            className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full"
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* Botões de interação */}
      <div className="flex gap-4 mt-2">
        <div className="text-sm text-gray-700 hover:text-blue-600">
          <InteractionButton type="likes" counter={postDetails.upvotes} onClickFn={() => handleVote(1)}
            active={postDetails.current_user_vote === 1} />
        </div>
        <div className="text-sm text-gray-700 hover:text-red-600">
          <InteractionButton type="dislikes" counter={postDetails.downvotes} onClickFn={() => handleVote(-1)}
            active={postDetails.current_user_vote === -1} />
        </div>
        <div className="text-sm text-gray-700 hover:text-green-600">
          <InteractionButton type="comment" counter={postDetails.comment_count} onClickFn={() => setCommentOpen(true)} />
        </div>
        {section === "comments" && (
          <p className="ml-auto text-xs text-gray-500 mt-1">
            Postado em {new Date(postDetails.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        )}
      </div>

      {/* Modal de comentário */}
      <Modal open={isCommentOpen} onClose={() => setCommentOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
          <Typography variant="h6">Comentar</Typography>
          <MDEditor
            aria-label="Escreva seu post aqui"
            value={commentContent}
            onChange={(val) => {
              if (!val || val.length <= 300) setCommentContent(val);
            }}
            height={300}
            preview="edit"
            commands={
              [commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.link,
              commands.quote,
              commands.code,
              commands.checkedListCommand,
              commands.unorderedListCommand,
              commands.orderedListCommand,
              ]
            }
            extraCommands={[
              commands.codeEdit,
              commands.codeLive,
              commands.codePreview,
            ]}
            data-color-mode="light"
          />
          <p className="text-sm text-gray-500">
            Limite de caracteres: {commentContent.length}/300
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outlined" onClick={() => setCommentOpen(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleCreateComment}>Enviar</Button>
          </div>
        </Box>
      </Modal>
      {/* Modal de edição de post */}
      <Modal open={isEditOpen} onClose={() => setEditOpen(false)}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl bg-white rounded-lg shadow-lg p-6 overflow-auto"
          sx={{
            maxHeight: '90vh', // limita altura máxima
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Editar post</h2>
          <PostForm
            initialTitle={postDetails.title}
            initialContent={postDetails.content}
            initialTags={postDetails.topics}
            initialAnonymous={postDetails.is_anonymous}
            submitLabel="Salvar"
            onSubmit={async ({ title, content, topics, is_anonymous }) => {
              try {
                await postService.updatePost(postDetails.id, title, content, topics, is_anonymous);
                show("success", "Post atualizado com sucesso!");
                setEditOpen(false);
                refreshPost();
              } catch (err) {
                show("error", "Erro ao editar o post.");
              }
            }}
          />
        </Box>
      </Modal>


      {/* Lista de Comentários */}
      {section === "comments" && postDetails.comments?.length > 0 && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h3 className="text-md font-semibold text-gray-800 mb-3">Comentários</h3>
          <div className="flex flex-col gap-3">
            {postDetails.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} postId={itemId} onUpdate={refreshPost} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
