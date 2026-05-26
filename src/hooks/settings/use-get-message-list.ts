import { fetchMessageList } from "@/services/settings/fetch-message-list";
import { useQuery } from "@tanstack/react-query";

export const useGetMessageList = (categoryId: number) => {
  return useQuery({
    queryKey: ["messages", categoryId],
    queryFn: () => fetchMessageList({ categoryId }),
  });
};
