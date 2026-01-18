import { ROUTER_PATH } from "@/constants/router-path";
import ChatWindow from "@/features/conversations/components/chat-window";
import type { MyUIMessage } from "@/features/messages/types/message.type";
import { Navigate, useLoaderData, useParams } from "react-router";

export default function ConversationPage() {
  const { conversationId } = useParams();
  const initialMessages = useLoaderData<MyUIMessage[]>();

  if (!conversationId) {
    return <Navigate to={ROUTER_PATH.CONVERSATION} />;
  }

  return (
    <>
      <div className="w-full min-h-screen">
        <ChatWindow
          conversationId={conversationId ?? ""}
          initialMessages={initialMessages}
        />
      </div>
    </>
  );
}
