"use client";
import { deleteTodoAction } from "@/actions/todo.actions";
import { ITodo } from "@/interfaces";
import { Trash } from "lucide-react";
import { useState } from "react";
import EditDialogOpen from "./EditDialogOpen";
import { Button } from "./ui/button";
import LoadingSpinner from "./ui/LoadingSpinner";

interface IProps {
  todo: ITodo;
}
const TableActions = ({ todo }: IProps) => {
  const [loading, setLoading] = useState(false);
  const onDelete = async (id: string) => {
    setLoading(true);
    await deleteTodoAction({ id });
    setLoading(false);
  };
  return (
    <>
      <EditDialogOpen activeTodo={todo} />
      <Button
        disabled={loading}
        variant={"destructive"}
        size={"icon"}
        //non-null assertion operator (!)
        onClick={() => onDelete(todo.id)}
      >
        {loading ? <LoadingSpinner /> : <Trash />}
      </Button>
    </>
  );
};

export default TableActions;
