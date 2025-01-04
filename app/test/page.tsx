import { createClient } from "@/lib/supabase/client";

export default async function Page() {
  const supabase = createClient();

  const { data: todos } = await supabase.from("todos").select();

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
      hi
    </ul>
  );
}
