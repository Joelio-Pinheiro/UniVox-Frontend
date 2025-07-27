import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilteredPostList from "./FilteredPostList";
import topicService from "../../services/topicService";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function SearchPage() {
    const [topicsOptions, setTopicsOptions] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    const order = searchParams.get("order") || "desc";
    const selectedTopics = searchParams.getAll("topics");

    useEffect(() => {
        topicService.getTopics()
            .then(setTopicsOptions)
            .catch(console.error);
    }, []);

    const handleOrderChange = (e) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("order", e.target.value);
        setSearchParams(newParams);
    };

    const handleTopicsChange = (_, newTopics) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("topics");
        newTopics.forEach(topic => {
            newParams.append("topics", topic.name);
        });
        setSearchParams(newParams);
    };

    return (
        <div className="flex flex-col items-center w-full px-4 sm:px-8 py-4">

            {/* Título */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center w-full">
                Resultados da Busca
            </h1>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row w-full max-w-3xl justify-between items-stretch gap-3 mb-4">

                {/* Autocomplete de tópicos */}
                <Autocomplete
                    multiple
                    options={topicsOptions}
                    getOptionLabel={(option) => option.name}
                    value={topicsOptions.filter(t => selectedTopics.includes(t.name))}
                    onChange={handleTopicsChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Filtrar por tópicos"
                            placeholder="Escolha os tópicos"
                            size="small"
                        />
                    )}
                    sx={{ flex: 1, minWidth: 200 }}
                    className="bg-white"
                />

                {/* Select de ordenação */}
                <select
                    name="order"
                    value={order}
                    onChange={handleOrderChange}
                    className="w-full sm:w-40 border px-3 py-2 rounded-md bg-white text-gray-800"
                >
                    <option value="desc">Mais recentes</option>
                    <option value="asc">Mais antigos</option>
                </select>
            </div>

            {/* Lista de posts filtrados */}
            <FilteredPostList search={search} topics={selectedTopics} order={order} />
        </div>
    );
}

export default SearchPage;