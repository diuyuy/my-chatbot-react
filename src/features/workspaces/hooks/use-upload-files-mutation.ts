import { QUERY_KEYS } from "@/constants/query-keys";
import {
  extractTextFromMarkdown,
  extractTextFromPdf,
  extractTextFromTxtFile,
  type ExtractedTextData,
} from "@/lib/text-extraction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createEmbedding } from "../api/rag.api";

export function useUploadFilesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (files: File[]) => {
      let successCount = 0;
      const errors: Array<{ fileName: string; error: Error }> = [];

      for (const file of files) {
        try {
          let extractedData: ExtractedTextData;

          // .txt 파일인 경우 텍스트 추출
          if (file.type.includes("text/plain") || file.name.endsWith(".txt")) {
            extractedData = await extractTextFromTxtFile(file);
          }
          // .md 또는 .markdown 파일인 경우 텍스트 추출
          else if (
            file.type.includes("text/markdown") ||
            file.name.endsWith(".md") ||
            file.name.endsWith(".markdown")
          ) {
            extractedData = await extractTextFromMarkdown(file);
          }
          // .pdf 파일인 경우 텍스트 추출
          else if (
            file.type.includes("application/pdf") ||
            file.name.endsWith(".pdf")
          ) {
            extractedData = await extractTextFromPdf(file);
          } else {
            throw new Error("지원하지 않는 파일 형식입니다.");
          }

          await createEmbedding(extractedData);
          successCount++;
        } catch (error) {
          console.error(`File processing error for ${file.name}:`, error);
          errors.push({
            fileName: file.name,
            error: error instanceof Error ? error : new Error("Unknown error"),
          });
        }
      }

      return { successCount, errors };
    },
    onSuccess: (data) => {
      if (data.successCount > 0) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.getRagQueryKeys(),
        });
        toast.success(`${data.successCount}개 파일 텍스트 추출 완료`);
      }

      // 개별 파일 에러 메시지 표시
      data.errors.forEach(({ fileName, error }) => {
        toast.error(`${fileName}: ${error.message}`);
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "파일 업로드 중 오류가 발생했습니다.",
      );
    },
  });
}
