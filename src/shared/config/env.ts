import { createEnv } from "@t3-oss/env-nextjs";
import { string } from "zod";

export const ENV = createEnv({
  client: {
    NEXT_PUBLIC_APP_API_URL: string().url().min(1, "NEXT_PUBLIC_APP_API_URL is missed"),
    NEXT_PUBLIC_API_KEY: string().min(1, "API KEY is missed"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  },
});
