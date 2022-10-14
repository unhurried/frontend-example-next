import { createProtectedRouter } from "./context";
import { prisma } from "../db/client"
import { z } from "zod";

export const todoRouter = createProtectedRouter()
  .query("getList", {
    async resolve({ ctx }) {
      return prisma.todo.findMany({ where: { userId: ctx.session.sub } });
    }
  })
  .query("get", {
    input: z.string().uuid(),
    async resolve({ input, ctx }) {
      return prisma.todo.findFirst({ where: { id: input, userId: ctx.session.sub } });
    }
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      category: z.string(),
      content: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      return prisma.todo.create({ data: { ...input, userId: ctx.session.sub } })
    }
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      title: z.string(),
      category: z.string(),
      content: z.string().optional(),
    }),
    async resolve({ input, ctx }) {
      return prisma.todo.updateMany({
        where: { id: input.id, userId: ctx.session.sub },
        data: { title: input.title, category: input.category, content: input.content }
      })
    }
  })
  .mutation("delete", {
    input: z.string().uuid(),
    async resolve({ input, ctx }) {
      return prisma.todo.deleteMany({ where: { id: input, userId: ctx.session.sub } })
    }
  })
