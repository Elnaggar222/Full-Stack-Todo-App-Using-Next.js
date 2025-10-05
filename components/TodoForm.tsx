"use client";
import { CreateTodoAction, UpdateTodoAction } from "@/actions/todo.actions";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormType } from "@/interfaces";
import { formSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import LoadingSpinner from "./ui/LoadingSpinner";
import { Textarea } from "./ui/textarea";
import { useContextProvider } from "@/Providers/ContextProvider";
import { useUser } from "@clerk/nextjs";
interface IProps {
  setOpen: (open: boolean) => void;
}
const TodoForm = ({ setOpen }: IProps) => {
  const { user } = useUser();
  const {
    operation,
    activeTodo: { id, title, description, completed },
  } = useContextProvider();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description: description as string,
      completed,
    },
  });
  const onSubmit = async (values: FormType) => {
    setLoading(true);
    if (operation === "add") {
      await CreateTodoAction({
        ...values,
        description: values.description as string,
        userId: user?.id,
      });
    } else {
      await UpdateTodoAction({
        description: values.description as string,
        ...values,
        id,
      });
    }
    setLoading(false);
    form.reset();
    setOpen(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter todo title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter todo Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Completed</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" className="w-[65px]" disabled={loading}>
            {!loading ? "Save" : <LoadingSpinner />}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" className="w-[65px]">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TodoForm;
