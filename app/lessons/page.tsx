"use client";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export default function Page() {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const supabase = createClient();

  // Fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodos(data || []);
    }
  };

  // Function to add todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    const { error } = await supabase.from("todos").insert([{ name: newTodo }]);

    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setNewTodo(""); // Clear input
      fetchTodos(); // Refresh the list
    }
  };

  return (
    <div className="p-4">
      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Todo
        </button>
      </form>

      {/* Todo List */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="border p-2">
            {todo.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
