import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { PostWithComments } from "@/interfaces";

const usePost = (postId: string) => {
  const url = postId ? `/api/posts/${postId}` : null;
  const { data, error, isLoading, mutate } = useSWR<PostWithComments>(
    url,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default usePost;
