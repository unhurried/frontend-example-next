'use server'

import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { prisma } from "../../server/db/client"

export type TodoItem = {
    id: string
    title: string
    category: string
    content: string
}

type TodoInput = {
    title: string
    category: string
    content: string
}

const requireUserId = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.sub) {
        throw new Error("Unauthorized")
    }
    return session.sub
}

const toTodoItem = (todo: { id: string; title: string; category: string; content: string | null }): TodoItem => ({
    id: todo.id,
    title: todo.title,
    category: todo.category,
    content: todo.content ?? "",
})

export const getTodoList = async (): Promise<TodoItem[]> => {
    const userId = await requireUserId()
    const todos = await prisma.todo.findMany({ where: { userId } })
    return todos.map(toTodoItem)
}

export const getTodo = async (id: string): Promise<TodoItem | null> => {
    const userId = await requireUserId()
    const todo = await prisma.todo.findFirst({ where: { id, userId } })
    return todo ? toTodoItem(todo) : null
}

export const createTodo = async (input: TodoInput): Promise<TodoItem> => {
    const userId = await requireUserId()
    const todo = await prisma.todo.create({
        data: {
            title: input.title,
            category: input.category,
            content: input.content ? input.content : null,
            userId,
        }
    })
    revalidatePath("/todos")
    return toTodoItem(todo)
}

export const updateTodo = async (input: TodoInput & { id: string }) => {
    const userId = await requireUserId()
    await prisma.todo.updateMany({
        where: { id: input.id, userId },
        data: {
            title: input.title,
            category: input.category,
            content: input.content ? input.content : null,
        }
    })
    revalidatePath(`/todos/${input.id}`)
    revalidatePath("/todos")
}

export const deleteTodo = async (id: string) => {
    const userId = await requireUserId()
    await prisma.todo.deleteMany({ where: { id, userId } })
    revalidatePath("/todos")
}
