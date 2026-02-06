import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { env } from "../../../../env/server.mjs";
import { appRouter } from "../../../../server/trpc/router/_app";
import { prisma } from "../../../../server/db/client";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => {
      return {
        session: null, // Session will be handled by client-side SessionProvider
        prisma,
      };
    },
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path}: ${error}`);
          }
        : undefined,
  });

export { handler as GET, handler as POST };
