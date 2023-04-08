import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { NotificationExtended } from "@/interfaces";

const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR<NotificationExtended[]>(
    url,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useNotifications;
