import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { env } from "../../../../env/server.mjs";
import { appRouter } from "../../../../server/trpc/router/_app";
import { prisma } from "../../../../server/db/client";

const handler = async (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => {
      const session = await getServerSession(authOptions);
      return {
        session,
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
