import { useMutation } from "@tanstack/react-query";
import { useRevalidator } from "react-router";
import { toast } from "sonner";
import { deleteChunkById } from "../api/rag.api";

export function useDeleteChunkMutation() {
  const revalidator = useRevalidator();

  return useMutation({
    mutationFn: (chunkId: string) => deleteChunkById(chunkId),
    onSuccess: () => {
      revalidator.revalidate();
      toast.success("임베딩이 성공적으로 삭제되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`임베딩 삭제에 실패했습니다: ${error.message}`);
    },
  });
}
