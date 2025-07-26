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
import TextField from "@mui/material/TextField";

export default function Content({ item, section }) {
  const { show } = useAlert();
  const [postDetails, setPostDetails] = useState(null);
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const data = await postService.getPostById(item.id);
        setPostDetails(data);
      } catch (error) {
        show("error", `Erro ao carregar detalhes do post`);
      }
    };

    fetchPostDetails();
  }, [item.id, show]);

  const handleVote = async (voteType) => {
    try {
      await postService.likePost(item.id, "post", voteType);
      const updated = await postService.getPostById(item.id);
      setPostDetails(updated);
    } catch (error) {
      show("error", "Erro ao votar no post.");
    }
  };
  const handleCreateComment = async () => {
    try {
      await postService.CreateComment(item.id, commentContent);
      setCommentOpen(false);
      setCommentContent("");
      const updated = await postService.getPostById(item.id);
      setPostDetails(updated);
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
        <div className="flex items-center gap-2">
          <Avatar>{postDetails.creator.user_name.charAt(1)}</Avatar>
          <span className="font-semibold text-sm">{postDetails.creator.user_name}</span>
        </div>
        <div className="text-gray-500 text-lg cursor-pointer">⋮</div>
      </div>

      {/* Título */}
      <Typography variant="h6" component="h6" className="!font-semibold !text-gray-900">{postDetails.title}</Typography>

      {/* Corpo em Markdown */}
      <div data-color-mode="light" className="prose prose-sm max-w-full text-sm text-gray-800 mb-2 p-2">
        <MDEditor.Markdown source={postDetails.content}/>
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
        <button onClick={() => handleVote(1)} className="text-sm text-gray-700 hover:text-blue-600">
          <InteractionButton type="likes" counter={postDetails.upvotes}/>
        </button>
        <button onClick={() => handleVote(-1)} className="text-sm text-gray-700 hover:text-red-600">
          <InteractionButton type="dislikes" counter={postDetails.downvotes} />
        </button>
        <button onClick={() => setCommentOpen(true)} className="text-sm text-gray-700 hover:text-green-600">
          <InteractionButton type="comment" counter={postDetails.comment_count} />
        </button>
        {section === "comments" && (
          <p className="ml-auto text-xs text-gray-500 mt-1">
            Postado em {new Date(postDetails.created_at).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Modal de comentário */}
      <Modal open={isCommentOpen} onClose={() => setCommentOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
          <Typography variant="h6">Comentar</Typography>
          {/* <TextField
            fullWidth
            multiline
            rows={4}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Digite seu comentário aqui..."
          /> */}
          <MDEditor
                    aria-label="Escreva seu post aqui"
                    value={commentContent}
                    onChange={(val) => {
                      if (!val || val.length <= 2000) setCommentContent(val);
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
                  />
          <div className="flex justify-end gap-2">
            <Button variant="outlined" onClick={() => setCommentOpen(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleCreateComment}>Enviar</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
