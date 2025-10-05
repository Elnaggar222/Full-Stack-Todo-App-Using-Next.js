"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContextProvider } from "@/Providers/ContextProvider";
import { Plus } from "lucide-react";
import { useState } from "react";
import TodoForm from "./TodoForm";
import { Button } from "./ui/button";
import { defaultActiveTodo } from "@/static";

const AddDialogOpen = () => {
  const [open, setOpen] = useState(false);
  const { setActiveTodo, setOperation } = useContextProvider();

  const onAdd = () => {
    setActiveTodo(defaultActiveTodo);
    setOperation("add");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-end mb-4">
        <DialogTrigger asChild>
          <Button className="flex items-center gap-1" onClick={onAdd}>
            <Plus size={20} />
            <span>Add Todo</span>
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription>
            Quickly create a new todo and stay on track with your tasks
          </DialogDescription>
        </DialogHeader>
        {/* Form */}
        <TodoForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
export default AddDialogOpen;
