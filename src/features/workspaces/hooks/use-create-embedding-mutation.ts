import { QUERY_KEYS } from "@/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createEmbedding } from "../api/rag.api";
import type { CreateEmbeddingDto } from "../types/rag.type";

export function useCreateEmbeddingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.getRagQueryKeys(),
    mutationFn: (data: CreateEmbeddingDto) => createEmbedding(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.getRagQueryKeys(),
      });
      toast.success("임베딩이 성공적으로 생성되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`임베딩 생성 실패: ${error.message}`);
    },
  });
}
