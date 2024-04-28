"use client"


import { useState } from 'react';
import { Bookmark } from "lucide-react";
import "animate.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoItem {
  id: number;
  text: string;
}

export default function Dashboard() {
  const [todo, setTodo] = useState<string>('');
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todo.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        text: todo.trim()
      };
      setTodoItems([...todoItems, newTodoItem]);
      setTodo('');
    }
  };

  return (
    <div>
      <nav className="flex justify-between items-center my-10 mx-20  text-white">
        <div className="flex items-center space-x-6">
          <Bookmark size={40} strokeWidth={1.9} className=" " />
          <h1 className="text-2xl">/</h1>
          <h1 className="text-xl">ToDo</h1>
        </div>
      </nav>
      <section className="flex justify-center my-64">
        <div className="flex flex-col items-center">
          <div className="w-96 mb-10">
            <Input 
              type="todo" 
              placeholder="+   Create ToDo" 
              className="mt-4" 
              value={todo}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <h1 className="text-sm items-end text-muted-foreground my-10">
              ToDo<span className="text-xs"> {todoItems.length} items</span>
            </h1>
            <div className="h-0.5 bg-muted rounded-sm"></div>
            {todoItems.map((item) => (
              <div key={item.id} className="my-5 items-center space-x-2 flex">
                <Checkbox id={`todo_${item.id}`} />
                <label htmlFor={`todo_${item.id}`} className="text-sm font-medium leading-none">
                  {item.text}
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
