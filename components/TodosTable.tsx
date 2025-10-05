import { getUserTodosAction } from "@/actions/todo.actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableActions from "./TableActions";
import { Badge } from "./ui/badge";
import { currentUser } from "@clerk/nextjs/server";

const Todostable = async () => {
  const user = await currentUser();
  const todos = await getUserTodosAction({ userId: user?.id as string });
  return (
    <Table>
      <TableCaption>A list of your recent todos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos &&
          todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id}</TableCell>
              <TableCell className="font-medium">{todo.title}</TableCell>
              <TableCell>
                {todo.completed ? (
                  <Badge>completed</Badge>
                ) : (
                  <Badge variant={"secondary"}>Uncompleted</Badge>
                )}
              </TableCell>
              <TableCell className="text-right flex items-center space-x-2 justify-end">
                <TableActions todo={todo} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{todos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default Todostable;
