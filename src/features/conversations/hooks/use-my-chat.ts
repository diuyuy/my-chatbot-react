import { BASE_URL } from "@/constants/base-url";
import { MY_API_KEY } from "@/constants/my-api-key";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { MyUIMessage } from "@/features/messages/types/message.type";
import { useChat } from "@ai-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import { createIdGenerator, DefaultChatTransport } from "ai";
import { toast } from "sonner";
import { useIsCreatingNewConversation } from "../stores/use-is-creating-new-conversation";

export const useMyChat = (
  conversationId: number,
  initialMessages?: MyUIMessage[],
) => {
  const { isCreating, setIsCreated } = useIsCreatingNewConversation();
  const queryClient = useQueryClient();

  return useChat({
    generateId: createIdGenerator({
      prefix: "msg",
      size: 16,
    }),
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: `${BASE_URL}/api/conversations`,
      prepareSendMessagesRequest: ({ messages, body }) => {
        return {
          headers: {
            Authorization: `Bearer ${MY_API_KEY}`,
          },
          body: {
            message: messages[messages.length - 1],
            conversationId,
            ...body,
          },
        };
      },
    }),
    onFinish: () => {
      if (isCreating) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.getConversationQueryKeys("history"),
        });
        setIsCreated();
      }
    },
    onError: () => {
      toast.error("예상치 못한 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
};
