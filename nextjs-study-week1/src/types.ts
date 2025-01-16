export type Todo = {
  id: string
  title: string
  completed: boolean
}

export type Paginate<T> = {
  data: T[]
  first: number
  items: number
  last: number
  next: number | null
  page: number
  prev: number | null
}

export type TodoListProps = {
  todoList: Todo[]
  onDeleteClick: (id: Todo["id"]) => void
  onToggleClick: ({ id, completed }: ToggleTodo) => void
}

export type TodoItemProps = Todo & {
  onDeleteClick: (id: Todo["id"]) => void
  onToggleClick: ({ id, completed }: ToggleTodo) => void
}

export type ToggleTodo = Omit<Todo, "title">
