"use server";
import { ITodo } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export const getUserTodosAction = async ({ userId }: { userId: string }) => {
  // throw error;
  //^ Error Handling
  return await prisma.todo.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const CreateTodoAction = async ({
  title,
  description,
  completed,
  userId,
}: ITodo) => {
  await prisma.todo.create({
    data: {
      title,
      description,
      completed,
      userId: userId as string,
    },
  });
  revalidatePath("/");
};
export const UpdateTodoAction = async ({
  id,
  title,
  description,
  completed,
}: ITodo) => {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      completed,
    },
  });
  revalidatePath("/");
};
export const deleteTodoAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
};
