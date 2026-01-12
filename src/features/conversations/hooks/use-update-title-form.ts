import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdateConversationTitleSchema } from "../schemas/conversation.schema";
import type { UpdateConversationTitleDto } from "../types/conversation.type";

export const useUpdateTitleForm = (defaultTitle: string) => {
  return useForm<UpdateConversationTitleDto>({
    resolver: zodResolver(UpdateConversationTitleSchema),
    defaultValues: {
      title: defaultTitle,
    },
  });
};
