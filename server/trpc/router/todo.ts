import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client"
import { z } from "zod";

export const todoRouter = router({
  getList: protectedProcedure.query(async ({ ctx }) => {
    return prisma.todo.findMany({ where: { userId: ctx.session.sub } });
  }),
  get: protectedProcedure
    .input(z.string().uuid())
    .query(({ input, ctx }) => {
      return prisma.todo.findFirst({ where: { id: input, userId: ctx.session.sub } });
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        category: z.string(),
        content: z.string().optional(),
      }))
    .mutation(({ input, ctx }) => {
      return prisma.todo.create({ data: { ...input, userId: ctx.session.sub } })
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        category: z.string(),
        content: z.string().optional(),
      }))
    .mutation(({ input, ctx }) => {
      return prisma.todo.updateMany({
        where: { id: input.id, userId: ctx.session.sub },
        data: { title: input.title, category: input.category, content: input.content }
      })
    }),
  delete: protectedProcedure
    .input(z.string().uuid())
    .mutation(({ input, ctx }) => {
      return prisma.todo.deleteMany({ where: { id: input, userId: ctx.session.sub } })
    }),
});
