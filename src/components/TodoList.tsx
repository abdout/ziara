"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
}

interface TodoListProps {
  todos?: Todo[];
}

const defaultTodos: Todo[] = [
  { id: "1", title: "Review pending orders", completed: false, priority: "high" },
  { id: "2", title: "Update product inventory", completed: false, priority: "medium" },
  { id: "3", title: "Send newsletter to customers", completed: true, priority: "low" },
  { id: "4", title: "Check payment gateway status", completed: false, priority: "high" },
  { id: "5", title: "Update shipping rates", completed: false, priority: "medium" },
];

export default function TodoList({ todos = defaultTodos }: TodoListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
        <CardDescription>Tasks for today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center space-x-2">
              {todo.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
              <span className={todo.completed ? "line-through text-gray-500" : ""}>
                {todo.title}
              </span>
              {todo.priority && (
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    todo.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : todo.priority === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {todo.priority}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}