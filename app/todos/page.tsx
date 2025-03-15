"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function TodosPage() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();
    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{user?.signInDetails?.loginId}'s todos</h1>
        <Link href="/" className="text-blue-500 hover:underline">Home</Link>
      </div>
      
      <button 
        onClick={createTodo}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
      >
        + New Todo
      </button>
      
      <ul className="border rounded-lg divide-y">
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => deleteTodo(todo.id)}
            className="p-3 hover:bg-gray-100 cursor-pointer"
          >
            {todo.content}
          </li>
        ))}
      </ul>
      
      <div className="mt-6">
        <button 
          onClick={signOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign out
        </button>
      </div>
    </main>
  );
} 