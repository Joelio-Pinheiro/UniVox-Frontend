import FloatingActionButtons from '../../customComponents/buttons/CreatePostButton';
import Content  from '../../customComponents/Content';
import postService from '../../services/postService';
import { useEffect, useState } from 'react';
import { useAlert } from '../../context/AlertContext';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const { show } = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await postService.getPosts();
        const formattedPosts = postsData.map(post => ({
          id: post.id,
          creator: {
            id: post.creator.id,
            name: post.creator.user_name,
          },
          title: post.title,
          upvotes: post.upvotes,
          downvotes: post.downvotes,
          comment_count: post.comment_count,
          topics: post.topics.map(topic => ({
            id: topic.id,
            name: topic.name,
          })),
        }));
        setPosts(formattedPosts);
      } catch (error) {
        show("Erro ao buscar posts:", error);
      }
    };
    fetchData();
  }, [show]);

  return (
    <>
      <FloatingActionButtons />
      {/* <div className="flex flex-col justify-center sm:w-4/5 w-full p-4 mt-4 h-full gap-2 shadow-md rounded-xl border bg-white border-gray-200"> */}
      <div className="flex flex-col justify-center sm:w-4/5 w-full p-4 mt-4 h-full gap-2">
        {posts.map((post, index) => (
          <Content key={index} item={post} section={"feed"} />
        ))}
      </div>
    </>
  );
}

export default HomePage;  