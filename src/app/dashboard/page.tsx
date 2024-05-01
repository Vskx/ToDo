"use client"


import 'animate.css';
import { useState } from 'react';
import { Bookmark, AlertCircle } from "lucide-react";
import "animate.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface TodoItem {
  id: number;
  text: string;
}

export default function Dashboard() {
  const [todo, setTodo] = useState<string>('');
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [error, setError] = useState<boolean>(false); // dodanie stanu dla błędu

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
    setError(false); // zresetowanie stanu błędu
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todo.trim() !== '') {
      if (todo.trim().length > 20) {
        setError(true); // ustawienie stanu błędu na true, jeśli tekst przekracza 20 znaków
      } else {
        const newTodoItem: TodoItem = {
          id: Date.now(),
          text: todo.trim()
        };
        setTodoItems([...todoItems, newTodoItem]);
        setTodo('');
      }
    }
  };

  return (
    <div>
      <header className="flex justify-between items-center my-10 mx-20  text-white">
        <div className="flex items-center space-x-6">
          <Bookmark size={40} strokeWidth={1.9} className=" " />
          <h2 className="text-2xl">/</h2>
          <h2 className="text-xl">ToDo</h2>
        </div>
      </header>
      <section className="flex justify-center my-64">
        <div className="flex flex-col items-center">
          <div className="w-96 mb-10">
          <label htmlFor="todoInput" className="sr-only">Create ToDo</label>
            <Input 
              type="text" 
              placeholder="+   Create ToDo" 
              className="mt-4" 
              value={todo}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {error && (
            <div className="fixed bottom-10 right-10 animate__animated animate__fadeInRightBig">
              <Alert variant="destructive" className=''>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
              Text cannot exceed more than 20 characters.
              </AlertDescription>
            </Alert>
            </div>
            )}
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
