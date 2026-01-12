import type { PaginationObject } from "@/types/common.type";
import type z from "zod/v3";
import type { UpdateConversationTitleSchema } from "../schemas/conversation.schema";

export type Conversation = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
};

export type PaginationConversation = PaginationObject<Conversation>;

export type UpdateConversationTitleDto = z.infer<
  typeof UpdateConversationTitleSchema
>;
