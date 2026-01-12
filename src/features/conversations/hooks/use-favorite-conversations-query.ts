import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteConversations } from "../api/conversation.api";

export function useFavoriteConversationsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.getConversationQueryKeys("favorites"),
    queryFn: fetchFavoriteConversations,
    staleTime: Infinity,
  });
}
