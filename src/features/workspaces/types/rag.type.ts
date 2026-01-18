import type { PaginationObject, SuccessResponse } from "@/types/common.type";

export type CreateEmbeddingDto = {
  content: string;
  resourceName?: string;
  docsLanguages?: string;
};

export type Resource = {
  id: string;
  userId: string;
  name: string;
  fileType: "text" | "txt" | "pdf";
  createdAt: Date;
};

export type ResourcePagination = SuccessResponse<PaginationObject<Resource>>;

export type ResourceDetail = Resource & {
  embeddings: {
    id: number;
    content: string;
    tag: string | null;
    createdAt: Date;
  }[];
};
