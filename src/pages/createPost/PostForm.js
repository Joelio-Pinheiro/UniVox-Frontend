import { useEffect, useState } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { TextField, Button, Chip, Switch, FormControlLabel } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import topicService from "../../services/topicService";
import { useAlert } from "../../context/AlertContext";

export default function PostForm({
  initialTitle = "",
  initialContent = "",
  initialTags = [],
  initialAnonymous = false,
  onSubmit,
  submitLabel = "Salvar"
}) {
  const { show } = useAlert();
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialContent);
  const [tags, setTags] = useState(initialTags);
  const [anonymous, setAnonymous] = useState(initialAnonymous);
  const [allTopics, setAllTopics] = useState([]);

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
  }, [show]);

  const handleRemoveTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag.id !== tagToDelete.id));
  };

  const handleSubmit = () => {
    const topicIds = tags.map(t => t.name);
    onSubmit({ title, content: body, topics: topicIds, is_anonymous: anonymous });
  };

  return (
    <div className="flex flex-col gap-4">
      <TextField
        label="Título"
        variant="outlined"
        fullWidth
        required
        inputProps={{ maxLength: 300 }}
        value={title}
        onChange={(e) => {
          if (!e.target.value || e.target.value.length <= 300) setTitle(e.target.value);
        }}
      />
      <p className="text-sm text-gray-500">
        Limite de caracteres: {title.length}/300
      </p>

      <div>
        <label className="font-sans text-gray-700">Corpo do post</label>
        <MDEditor
          value={body}
          onChange={(val) => {
            if (!val || val.length <= 2000) setBody(val);
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
          extraCommands={[commands.codeEdit, commands.codeLive, commands.codePreview]}
          data-color-mode="light"
        />
        <p className="text-sm text-gray-500 mt-2">
          Limite de caracteres: {body.length}/2000
        </p>
      </div>

      <div>
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
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, idx) => (
            <Chip key={idx} label={`#${tag.name}`} onDelete={() => handleRemoveTag(tag)} color="primary" />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Limite de Tópicos: {tags.length}/5</p>
      </div>

      <FormControlLabel
        control={
          <Switch checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
        }
        label="Postar anonimamente"
      />

      <div className="flex justify-end">
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!title.trim()}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
