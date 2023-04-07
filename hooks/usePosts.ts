import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { PostWithComments } from "@/interfaces";

const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";
  const { data, error, isLoading, mutate } = useSWR<PostWithComments[]>(
    url,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default usePosts;
