import { ROUTER_PATH } from "@/constants/router-path";
import { authClient } from "@/features/auth/auth-client";
import MainLayout from "@/pages/layouts/main-layout";
import ProtectedRoute from "@/pages/layouts/protected-route";
import NewChatPage from "@/pages/new-chat-page";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    loader: async () => {
      try {
        const { data } = await authClient.getSession();
        return data?.user ?? null;
      } catch {
        return null;
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
            element: <NewChatPage />,
          },
          {
            path: ROUTER_PATH.WORKSPACE,
            element: <NewChatPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <div>Hello Login</div>,
  },
]);
