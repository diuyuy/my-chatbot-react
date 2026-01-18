import { useParams } from "react-router";
import ConversationPage from "./conversation-page";

export default function ConversationPageWrapper() {
  const { conversationId } = useParams();
  // conversationId가 바뀌면 ConversationPage가 완전히 리마운트됨
  return <ConversationPage key={conversationId} />;
}
