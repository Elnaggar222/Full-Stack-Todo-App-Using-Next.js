"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import TodoForm from "./TodoForm";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";
import { useContextProvider } from "@/Providers/ContextProvider";
import { ITodo } from "@/interfaces";
interface IProps {
  activeTodo: ITodo;
}
const EditDialogOpen = ({ activeTodo }: IProps) => {
  const [open, setOpen] = useState(false);
  const { setActiveTodo, setOperation } = useContextProvider();

  const onEdit = () => {
    setActiveTodo(activeTodo);
    setOperation("edit");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" onClick={onEdit}>
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update this Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo and keep your list up-to-date.
          </DialogDescription>
        </DialogHeader>
        {/* Form */}
        <TodoForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
export default EditDialogOpen;
