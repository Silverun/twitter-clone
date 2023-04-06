import useSWR from "swr";
import { User } from "../interfaces/index";
import fetcher from "@/libs/fetcher";

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<User>(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useUser;
