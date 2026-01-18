import { BASE_URL } from "@/constants/base-url";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
});
