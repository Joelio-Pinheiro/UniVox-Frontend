import { useEffect, useState } from "react";
import postService from '../../services/postService';
import Content from "../../customComponents/Content";

function FilteredPostList({ search = "", topics = [], order = "desc" }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const resultado = await postService.getFilteredPosts({ search, topics, order });
      const formatted = resultado.map(post => ({ id: post.id }));
      setPosts(formatted);
    };

    carregar();
  }, [search, topics, order]);

  return (
    <div className="flex flex-col justify-center sm:w-4/5 w-full mt-4 h-full gap-2">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Nenhum post encontrado.
        </p>
      ) : (
        posts.map((post, index) => (
          <Content key={index} itemId={post.id} section={"feed"} isFeed={true} />
        ))
      )}
    </div>
  );
}

export default FilteredPostList;