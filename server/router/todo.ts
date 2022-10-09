import { createProtectedRouter } from "./context";

import { prisma } from "../db/client"

export const todoRouter = createProtectedRouter()
  .query("list", {
    async resolve({ ctx }) {
      return prisma.todo.findMany();
    }
  })
  .mutation("create", {
    async resolve({ ctx }) {
      return prisma.todo.create({ data: { title: "Test Item", category: 'one' } })
    }
  })


