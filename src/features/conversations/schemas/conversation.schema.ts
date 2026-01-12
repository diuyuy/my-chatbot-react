import z from "zod/v3";

export const UpdateConversationTitleSchema = z.object({
  title: z.string().nonempty(),
});
