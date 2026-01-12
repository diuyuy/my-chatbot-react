import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchHistoryMessages } from "../api/conversation.api";

export function useConversationsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.getConversationQueryKeys("history"),
    queryFn: fetchHistoryMessages,
    staleTime: Infinity,
  });
}
