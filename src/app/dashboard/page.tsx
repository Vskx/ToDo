"use client"


import { useEffect, useState } from 'react';
import { Bookmark, AlertCircle, Trash2 } from "lucide-react";
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
  const [todo, setTodo] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedTodo = localStorage.getItem('todo');
      return savedTodo ? savedTodo : '';
    } else {
      return '';
    }
  });

  const [todoItems, setTodoItems] = useState<TodoItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTodoItems = localStorage.getItem('todoItems');
      return savedTodoItems ? JSON.parse(savedTodoItems) : [];
    } else {
      return [];
    }
  });
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('todo', todo);
  }, [todo]);

  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }, [todoItems]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
    setError(false); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todo.trim() !== '') {
      if (todo.trim().length > 20) {
        setError(true); 
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

  const handleDeleteTodo = (id: number) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <nav className="flex justify-between items-center my-10 mx-20  text-white">
        <div className="flex items-center space-x-6">
          <Bookmark size={40} strokeWidth={1.9} className=" " />
          <h2 className="text-xl">ToDo</h2>
        </div>
      </nav>
      <section className="flex justify-center my-64">
        <div className="flex flex-col items-center">
          <div className="w-96 mb-10">
            <label htmlFor="todoInput" className="sr-only">Create ToDo</label>
            <Input 
              type="text" 
              id="todoInput" 
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
            <h3 className="text-sm items-end text-muted-foreground my-10">
              ToDo<span className="text-xs"> {todoItems.length} items</span>
            </h3>
            <div className="h-0.5 bg-muted rounded-sm"></div>
            {todoItems.map((item) => (
              <div key={item.id} className="my-5 items-center space-x-2 flex">
                <Checkbox id={`todo_${item.id}`} />
                <div className="flex items-center">
                  <label htmlFor={`todo_${item.id}`} className="text-sm font-medium leading-none mr-2">
                    {item.text}
                  </label>
                  <Trash2 className="cursor-pointer" size={16} onClick={() => handleDeleteTodo(item.id)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
