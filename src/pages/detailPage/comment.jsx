import { useState, useEffect } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import {
  Avatar, Typography, Button, Box, Modal, IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import InteractionButton from "../../customComponents/buttons/InteractionButton";
import postService from "../../services/postService";
import { useAlert } from "../../context/AlertContext";

export default function Comment({ comment, postId, onUpdate }) {
  const { show } = useAlert();
  const [isReplyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [localComment, setLocalComment] = useState(comment);
  const [showReplies, setShowReplies] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState("");

  const userData = JSON.parse(localStorage.getItem("user_data"));
  const isAuthor = userData?.id === comment.creator.id;

  useEffect(() => {
    setLocalComment(comment);
  }, [comment]);

  const handleVote = async (voteType) => {
    try {
      await postService.likePost(comment.id, "comment", voteType);
      await onUpdate();
    } catch (error) {
      show("error", "Erro ao votar no comentário.");
    }
  };

  const handleReply = async () => {
    try {
      await postService.CreateComment(postId, replyContent, comment.id);
      show("success", "Resposta enviada!");
      setReplyContent("");
      setReplyOpen(false);
      await onUpdate();
    } catch (error) {
      show("error", "Erro ao responder.");
    }
  };

  const handleDelete = async () => {
    try {
      await postService.deleteComment(comment.id);
      show("success", "Comentário deletado.");
      await onUpdate();
    } catch (error) {
      show("error", "Erro ao deletar comentário.");
    }
  };

  const handleEdit = async () => {
    try {
      await postService.updateComment(comment.id, editContent);
      show("success", "Comentário editado com sucesso!");
      setIsEditMode(false);
      await onUpdate();
    } catch (error) {
      show("error", "Erro ao editar comentário.");
    }
  };

  return (
    <div className="flex w-full items-start overflow-hidden max-w-full">
      {/* Conteúdo */}
      <div className="flex-1 min-w-0 w-full border-l-2 border-gray-300 pl-2 sm:pl-4">
        <div className="flex flex-row items-center gap-2 mb-1 justify-between">
          <div className="flex items-center gap-2">
            <Avatar sx={{ width: 28, height: 28 }}>
              {localComment.creator.user_name.charAt(1).toUpperCase()}
            </Avatar>
            <div>
              <Typography variant="subtitle2" className="leading-4">
                {localComment.creator.user_name}
              </Typography>
              <Typography variant="caption" className="text-gray-500 leading-3">
                {new Date(localComment.created_at).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center gap-1">
            {localComment.replies?.length > 0 && (
              <IconButton
                size="small"
                onClick={() => setShowReplies(!showReplies)}
                title={showReplies ? "Ocultar respostas" : "Ver respostas"}
              >
                {showReplies ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
              </IconButton>
            )}
            {isAuthor && (
              <>
                <IconButton size="small" onClick={() => {
                  setEditContent(localComment.content);
                  setIsEditMode(true);
                }} title="Editar comentário">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={handleDelete} title="Deletar comentário">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </div>
        </div>

        {/* Corpo do comentário */}
        <div className="text-sm text-gray-800 mb-2 prose prose-sm max-w-full" data-color-mode="light">
          <MDEditor.Markdown
            source={localComment.content}
            style={{
              backgroundColor: "transparent",
              padding: 0,
              margin: 0,
            }}
          />
        </div>

        {/* Botões */}
        <div className="flex gap-3 items-center mb-2 text-gray-600 flex-wrap">
          <InteractionButton
            type="likes"
            counter={localComment.upvotes}
            onClickFn={() => handleVote(1)}
            active={localComment.user_vote === 1}
          />
          <InteractionButton
            type="dislikes"
            // counter={localComment.downvotes}
            onClickFn={() => handleVote(-1)}
            active={localComment.user_vote === -1}
          />
          <InteractionButton
            type="comment"
            counter={localComment.replies?.length || 0}
            onClickFn={() => setReplyOpen(true)}
          />
        </div>

        {/* Respostas */}
        {localComment.replies?.length > 0 && showReplies && (
          <div className="pl-2 sm:pl-4 border-l-2 border-gray-200 mt-2 overflow-x-auto">
            {localComment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} postId={postId} onUpdate={onUpdate} />
            ))}
          </div>
        )}

        {/* Modal de resposta */}
        <Modal open={isReplyOpen} onClose={() => setReplyOpen(false)}>
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:max-w-md px-4 bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
            <Typography variant="h6">Responder Comentário</Typography>
            <MDEditor
              value={replyContent}
              onChange={(val) => {
                if (!val || val.length <= 300) setReplyContent(val);
              }}
              height={300}
              preview="edit"
              commands={[
                commands.bold,
                commands.italic,
                commands.strikethrough,
                commands.link,
                commands.quote,
                commands.code,
                commands.checkedListCommand,
                commands.unorderedListCommand,
                commands.orderedListCommand,
              ]}
              extraCommands={[
                commands.codeEdit,
                commands.codeLive,
                commands.codePreview,
              ]}
              data-color-mode="light"
            />
            <p className="text-sm text-gray-500">Limite de caracteres: {replyContent.length}/300</p>
            <div className="flex justify-end gap-2">
              <Button variant="outlined" onClick={() => setReplyOpen(false)}>Cancelar</Button>
              <Button variant="contained" onClick={handleReply}>Responder</Button>
            </div>
          </Box>
        </Modal>

        {/* Modal de edição */}
        <Modal open={isEditMode} onClose={() => setIsEditMode(false)}>
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:max-w-md px-4 bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
            <Typography variant="h6">Editar Comentário</Typography>
            <MDEditor
              value={editContent}
              onChange={(val) => {
                if (!val || val.length <= 300) setEditContent(val);
              }}
              height={300}
              preview="edit"
              commands={[
                commands.bold,
                commands.italic,
                commands.strikethrough,
                commands.link,
                commands.quote,
                commands.code,
                commands.checkedListCommand,
                commands.unorderedListCommand,
                commands.orderedListCommand,
              ]}
              extraCommands={[
                commands.codeEdit,
                commands.codeLive,
                commands.codePreview,
              ]}
              data-color-mode="light"
            />
            <p className="text-sm text-gray-500">Limite de caracteres: {editContent.length}/300</p>
            <div className="flex justify-end gap-2">
              <Button variant="outlined" onClick={() => setIsEditMode(false)}>Cancelar</Button>
              <Button variant="contained" onClick={handleEdit}>Salvar</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
