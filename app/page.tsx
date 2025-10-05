import AddDialogOpen from "@/components/AddDialogOpen";
import Todostable from "@/components/TodosTable";

export default async function Home() {
  return (
    <main>
      <AddDialogOpen />
      <Todostable />
    </main>
  );
}
