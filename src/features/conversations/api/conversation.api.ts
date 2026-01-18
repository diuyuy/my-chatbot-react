import { BASE_URL } from "@/constants/base-url";
import { MY_API_KEY } from "@/constants/my-api-key";
import type { ErrorResponse, SuccessResponse } from "@/types/common.type";
import type {
  Conversation,
  PaginationConversation,
  UpdateConversationTitleDto,
} from "../types/conversation.type";

type DeleteConversationData = {
  conversationId: string;
};

export async function fetchHistoryMessages(): Promise<
  SuccessResponse<PaginationConversation>
> {
  const requestUrl = new URL(`${BASE_URL}/api/conversations`);
  requestUrl.searchParams.append("limit", String(20));
  requestUrl.searchParams.append("direction", "desc");
  const response = await fetch(requestUrl, {
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
}

export async function fetchConversationsByPagination(
  cursor?: string,
  filter?: string,
): Promise<SuccessResponse<PaginationConversation>> {
  const requestUrl = new URL(`${BASE_URL}/api/conversations`);
  if (cursor) {
    requestUrl.searchParams.append("cursor", cursor);
  }
  requestUrl.searchParams.append("limit", String(15));
  requestUrl.searchParams.append("direction", "desc");
  requestUrl.searchParams.append("includeFavorite", String(true));
  requestUrl.searchParams.append("filter", String(filter));

  const response = await fetch(requestUrl, {
    method: "get",
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
}

export async function createNewConversation(message: string): Promise<string> {
  const response = await fetch(`${BASE_URL}/api/conversations/new`, {
    method: "post",
    body: JSON.stringify({ message }),
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

  const { data }: SuccessResponse<{ conversationId: string }> =
    await response.json();

  return data.conversationId;
}

export async function fetchFavoriteConversations(): Promise<
  SuccessResponse<Conversation[]>
> {
  const response = await fetch(`${BASE_URL}/api/conversations/favorites`, {
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
}

export async function updateConversationTitle(
  conversationId: string,
  updateConversationTitleDto: UpdateConversationTitleDto,
): Promise<SuccessResponse<null>> {
  const response = await fetch(
    `${BASE_URL}/api/conversations/${conversationId}`,
    {
      method: "PATCH",
      body: JSON.stringify(updateConversationTitleDto),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MY_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
}

/**
 * 대화를 삭제합니다.
 * @param conversationId - 삭제할 대화의 UUID
 * @returns 삭제된 대화 정보
 */
export async function deleteConversation(
  conversationId: string,
): Promise<SuccessResponse<DeleteConversationData>> {
  const response = await fetch(
    `${BASE_URL}/api/conversations/${conversationId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MY_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
}

/**
 * 대화를 즐겨찾기에 추가합니다.
 * @param conversationId - 즐겨찾기에 추가할 대화의 UUID
 * @returns 성공 응답
 */
export async function addConversationToFavorites(
  conversationId: string,
): Promise<SuccessResponse<null>> {
  const response = await fetch(
    `${BASE_URL}/api/conversations/${conversationId}/favorites`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MY_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
}

/**
 * 대화를 즐겨찾기에서 제거합니다.
 * @param conversationId - 즐겨찾기에서 제거할 대화의 UUID
 * @returns 성공 응답
 */
export async function removeConversationFromFavorites(
  conversationId: string,
): Promise<SuccessResponse<null>> {
  const response = await fetch(
    `${BASE_URL}/api/conversations/${conversationId}/favorites`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MY_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
}
