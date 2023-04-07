import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { toast } from "react-hot-toast";
import axios from "axios";

interface useLikeProps {
  postId: string;
  userId?: string;
}

const useLike = ({ postId, userId }: useLikeProps) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    return list.includes(currentUser?.id as string);
  }, [currentUser?.id, fetchedPost]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      if (hasLiked) {
        await axios.delete("/api/like", { data: { postId } });
      } else {
        await axios.post("/api/like", { postId });
      }
      mutateFetchedPosts();
      mutateFetchedPost();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    hasLiked,
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModal,
    postId,
  ]);
  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
