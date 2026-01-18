import { fetchMessagesByConversationId } from "@/features/messages/api/message.api";
import { findResourceById } from "@/features/workspaces/api/rag.api";
import ConversationPageWrapper from "@/pages/conversation-page-wrapper";
import ErrorPage from "@/pages/error-page";
import NewConversationPage from "@/pages/new-conversation-page";
import ResourcePage from "@/pages/resource-page";
import SearchPage from "@/pages/search-page";
import WorkspacePage from "@/pages/workspace-page";
import { createBrowserRouter, Navigate, redirect } from "react-router";
import { ROUTER_PATH } from "../constants/router-path";
import MainLayout from "../pages/layouts/main-layout";
import ProtectedRoute from "../pages/layouts/protected-route";
import LoginPage from "../pages/login-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    loader: async () => {
      try {
        const isLoggedIn = true;
        return isLoggedIn;
      } catch {
        return false;
      }
    },
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true, // 루트 경로에서 기본으로 보여줄 페이지
            element: <Navigate to={ROUTER_PATH.CONVERSATION} replace />,
          },
          {
            path: ROUTER_PATH.CONVERSATION,
            children: [
              {
                index: true,
                element: <NewConversationPage />,
              },
              {
                path: ":conversationId",
                element: <ConversationPageWrapper />,
                loader: async ({ params }) => {
                  const { conversationId } = params;
                  if (!conversationId) {
                    throw redirect(ROUTER_PATH.CONVERSATION);
                  }
                  const { data } =
                    await fetchMessagesByConversationId(+conversationId);

                  return data;
                },
              },
            ],
          },
          {
            path: ROUTER_PATH.SEARCH,
            element: <SearchPage />,
          },
          {
            path: ROUTER_PATH.WORKSPACE,
            children: [
              {
                index: true,
                element: <WorkspacePage />,
              },
              {
                path: `${ROUTER_PATH.WORKSPACE}/resource/:resourceId`,
                element: <ResourcePage />,
                loader: async ({ params }) => {
                  const { resourceId } = params;

                  if (!resourceId) {
                    throw redirect(ROUTER_PATH.WORKSPACE);
                  }

                  const { data } = await findResourceById(+resourceId);

                  return data;
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
