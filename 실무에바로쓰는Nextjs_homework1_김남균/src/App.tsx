import { useEffect, useState } from "react"
import "./App.css"
import { Paginate, Todo, TodoItemProps, TodoListProps, ToggleTodo } from "./types"

const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    getTodo().then(({ data }) => setTodoList(data))
  }, [])

  const getTodo = async () => {
    const res = await fetch("http://localhost:3001/todos?_page=1&_per_pagee=25")
    const result: Paginate<Todo> = await res.json()
    return result
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleAddTodo = async () => {
    if (title === "") return

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    }

    await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })

    setTodoList((prev) => [...prev, newTodo])
    setTitle("")
  }

  const handleDeleteTodo = async (id: Todo["id"]) => {
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    })

    setTodoList((prev) => prev.filter((todo) => todo.id !== id))
  }

  const handleToggleTodo = async ({ id, completed }: ToggleTodo) => {
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })

    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo))
    )
  }

  return (
    <>
      <div className="container">
        <h2>Todo List</h2>
        <input type="text" value={title} onChange={handleTitleChange} />
        <button className="add" onClick={handleAddTodo}>
          add Todo
        </button>
        <TodoList
          todoList={todoList}
          onDeleteClick={handleDeleteTodo}
          onToggleClick={handleToggleTodo}
        />
      </div>
    </>
  )
}

const TodoList = ({ todoList, onDeleteClick, onToggleClick }: TodoListProps) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onDeleteClick={onDeleteClick}
          onToggleClick={onToggleClick}
        />
      ))}
    </ul>
  )
}

const TodoItem = ({ id, title, completed, onDeleteClick, onToggleClick }: TodoItemProps) => {
  return (
    <li>
      <div className={completed ? "completed" : ""}>{title}</div>
      <div>
        <button onClick={() => onToggleClick({ id, completed })}>
          {completed ? `Undo` : `Completed`}
        </button>
        <button className="remove" onClick={() => onDeleteClick(id)}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default App
