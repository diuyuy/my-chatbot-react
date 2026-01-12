import { QUERY_KEYS } from "@/constants/query-keys";
import { ROUTER_PATH } from "@/constants/router-path";
import { createNewConversation } from "@/features/conversations/api/conversation.api";
import { PromptInput } from "@/features/conversations/components/prompt-input";
import { usePromptInput } from "@/features/conversations/hooks/use-prompt-input";
import { useIsCreatingNewConversation } from "@/features/conversations/stores/use-is-creating-new-conversation";
import { useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function NewChatPage() {
  const promptInput = usePromptInput();
  const navigate = useNavigate();

  const { setIsCreating } = useIsCreatingNewConversation();

  const mutation = useMutation({
    mutationKey: QUERY_KEYS.getConversationQueryKeys(),
    mutationFn: createNewConversation,
    onSuccess: (conversationId) => {
      setIsCreating(promptInput.value.trim(), promptInput.files);
      promptInput.clearState();
      navigate(`${ROUTER_PATH.CONVERSATION}/${conversationId}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error("예상치 못한 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (promptInput.value.trim()) {
      mutation.mutate(promptInput.value.trim());
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-center text-center text-3xl font-bold">
          채팅을 입력해보세요!
        </div>
        <form onSubmit={handleSubmit}>
          <PromptInput {...promptInput} isSending={false} />
        </form>
      </div>
    </div>
  );
}
