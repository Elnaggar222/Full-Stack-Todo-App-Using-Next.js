import { formSchema } from "@/schema";
import z from "zod";

export type FormType = z.infer<typeof formSchema>;
export interface ITodo {
  id?: string;
  title: string;
  description: string | null;
  completed: boolean;
  userId?: string;
  createdAt?: Date;
}
export type TOperation = "add" | "edit";
