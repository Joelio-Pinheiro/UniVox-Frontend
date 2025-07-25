import { useState } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { TextField, Button, Chip, Switch, FormControlLabel } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Autocomplete from "@mui/material/Autocomplete";



const user = {
  id: "12345",
  name: "John Doe",
  img: "https://via.placeholder.com/150"
}

const topics = [
  { id: 1, name: "r/anime", avatar: "/path/to/anime.jpg" },
  { id: 2, name: "r/anime_irl", avatar: "/path/to/animeirl.jpg" },
  { id: 3, name: "r/BaldursGate3", avatar: "/path/to/baldur.jpg" },
  { id: 4, name: "r/books", avatar: "/path/to/books.jpg" },
  { id: 5, name: "r/investimentos", avatar: "/path/to/invest.jpg" },
  { id: 6, name: "r/tecnologia", avatar: "/path/to/tech.jpg" },
  { id: 7, name: "r/filmes", avatar: "/path/to/movies.jpg" },
  { id: 8, name: "r/series", avatar: "/path/to/series.jpg" },
  { id: 9, name: "r/games", avatar: "/path/to/games.jpg" },
  { id: 10, name: "r/musica", avatar: "/path/to/music.jpg" }
];

export function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleRemoveTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleSubmit = () => {
    // lógica de envio
    console.log({ title, body, tags, anonymous });
  };

  return (
    // <div className="flex flex-col justify-center max-w-3xl p-4 min-h-screen overflow-y-auto gap-2">
    // mexer nesse tamanho de div, principal problema de responsividade
    <div className="flex flex-col justify-center sm:w-4/5 w-full p-4 mt-4 h-full gap-2 shadow-md rounded-xl border border-gray-200">
      <h1 className="text-2xl font-semibold mb-4">Criar post</h1>

      {/* Anônimo toggle */}
      <div className="flex items-center gap-12 mb-4">
        <div className="flex items-center gap-3">
          {/* <img
            src={user.img}
            alt={user.name}
            className="w-10 h-10 rounded-full mr-2"
          /> */}
          <Avatar>M</Avatar>
          <h4>
            {user.name}
          </h4>
        </div>
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
            options={topics
              .map((topic) => topic.name)
              .filter((name) => !tags.includes(name))}
            value={tagInput}
            onChange={(e, newValue) => {
              if (newValue && tags.length < 5) {
                setTags([...tags, newValue]);
                setTagInput("");
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Adicionar tópicos" variant="outlined" fullWidth />
            )}
            className="!w-full"
          />

          {/* <Button variant="contained" onClick={handleAddTag}>
            Adicionar
          </Button> */}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, idx) => (
            <Chip
              key={idx}
              label={`#${tag}`}
              onDelete={() => handleRemoveTag(tag)}
              color="primary"
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Limite de Tópicos: {tags.length}/5</p>
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
