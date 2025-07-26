import { useState, useEffect } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { TextField, Button, Chip, Switch, FormControlLabel } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Autocomplete from "@mui/material/Autocomplete";
import postService from "../../services/postService";
import topicService from "../../services/topicService";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";



const user = {
  id: "12345",
  name: "John Doe",
  img: "https://via.placeholder.com/150"
}

const topics = [
  { id: 1, name: "r/anime" },
  { id: 2, name: "r/anime_irl" },
  { id: 3, name: "r/BaldursGate3" },
  { id: 4, name: "r/books" },
  { id: 5, name: "r/investimentos" },
  { id: 6, name: "r/tecnologia" },
  { id: 7, name: "r/filmes" },
  { id: 8, name: "r/series" },
  { id: 9, name: "r/games" },
  { id: 10, name: "r/musica" }
];

export function CreatePostPage() {
  const navigate = useNavigate();
  const { show } = useAlert();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [allTopics, setAllTopics] = useState([]);
  const [tags, setTags] = useState([]);
  const [anonymous, setAnonymous] = useState(false);

  const handleRemoveTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag.id !== tagToDelete.id));
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await topicService.getTopics();
        setAllTopics(data); 
      } catch (error) {
        show("error", "Erro ao carregar tópicos");
      }
    };

    fetchTopics();
  }, []);


  const handleSubmit = async () => {
    try {
      const topicIds = tags.map(t => t.name);
      const response = await postService.createPost(title, body, topicIds, anonymous);

      show("success", response.message || "Post criado com sucesso!");
      navigate("/");
    } catch (error) {
      show("error", error.message || "Erro ao criar o post.");
    }
  };

  return (
    <div className="flex flex-col bg-white justify-center sm:w-4/5 w-full p-4 mt-4 h-full gap-2 shadow-md rounded-xl border border-gray-200">
      <h1 className="text-2xl font-semibold mb-4">Criar post</h1>


      {/* Título */}
      <TextField
        label="Título"
        variant="outlined"
        fullWidth
        required
        inputProps={{ maxLength: 300 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />
      <p className="text-sm text-gray-500 mb-2">
        Limite de caracteres: {title.length}/300
      </p>

      {/* Corpo */}
      <div data-color-mode="light"
        className="flex flex-col gap-2">
        <label className="font-sans text-gray-700">
          Corpo do post
        </label>
        <MDEditor
          aria-label="Escreva seu post aqui"
          value={body}
          onChange={setBody}
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
      </div>
      <p className="text-sm text-gray-500 mb-2 mt-2">
        Limite de caracteres: {body.length}/2000
      </p>

      {/* Tags */}
      <div className="mb-4">
        <div className="flex gap-2 mb-2 w-full">
          <Autocomplete
            options={allTopics.filter(topic => !tags.find(t => t.id === topic.id))}
            getOptionLabel={(option) => option.name}
            value={null}
            onChange={(e, newValue) => {
              if (newValue && tags.length < 5) {
                setTags([...tags, newValue]);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Adicionar tópicos" variant="outlined" fullWidth />
            )}
            className="!w-full"
          />

        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, idx) => (
            <Chip
              key={idx}
              label={`#${tag.name}`}
              onDelete={() => handleRemoveTag(tag)}
              color="primary"
            />
          ))}

        </div>
        <p className="text-sm text-gray-500 mt-2">Limite de Tópicos: {tags.length}/5</p>
      </div>
      {/* Anônimo toggle */}
      <div className="flex items-center gap-12 mb-4">
        <div className="flex items-center justify-end">
          <FormControlLabel
            control={
              <Switch
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
              />
            }
            label="Postar anonimamente"
          />
        </div>
      </div>

      {/* Botão de postar */}
      <div className="flex justify-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!title.trim()}
        >
          Postar
        </Button>
      </div>
    </div>
  );
}
