import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);
  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      if (isFollowing) {
        await axios.delete("/api/follow", { data: { userId } });
      } else {
        await axios.post("/api/follow", { userId });
      }
      mutateCurrentUser();
      mutateFetchedUser();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    isFollowing,
    currentUser,
    loginModal,
    mutateCurrentUser,
    mutateFetchedUser,
    userId,
  ]);

  return { isFollowing, toggleFollow };
};

export default useFollow;
