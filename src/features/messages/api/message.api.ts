import { BASE_URL } from "@/constants/base-url";
import { MY_API_KEY } from "@/constants/my-api-key";
import type {
  ErrorResponse,
  PaginationObject,
  SuccessResponse,
} from "@/types/common.type";
import type { DeleteMessagesDto, MyUIMessage } from "../types/message.type";

export const fetchMessages = async (
  conversationId: string,
  limit: number,
  cursor?: string,
): Promise<SuccessResponse<PaginationObject<MyUIMessage>>> => {
  const requestUrl = new URL(`${BASE_URL}/api/conversations/${conversationId}`);
  if (cursor) {
    requestUrl.searchParams.append("cursor", cursor);
  }
  requestUrl.searchParams.append("limit", String(limit));

  const response = await fetch(requestUrl, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MY_API_KEY}`,
    },
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw Error(errorData.message);
  }

  return response.json();
};

export const fetchMessagesByConversationId = async (
  conversationId: number,
): Promise<SuccessResponse<MyUIMessage[]>> => {
  const response = await fetch(
    `${BASE_URL}/api/conversations/${conversationId}/messages`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MY_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();

    throw new Error(errorData.message);
  }

  return response.json();
};

export const deleteMessage = async (
  deleteMessageDto: DeleteMessagesDto,
): Promise<
  SuccessResponse<{
    messageId: string;
  }>
> => {
  const response = await fetch(`${BASE_URL}/api/messages`, {
    method: "DELETE",
    body: JSON.stringify(deleteMessageDto),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MY_API_KEY}`,
    },
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};
