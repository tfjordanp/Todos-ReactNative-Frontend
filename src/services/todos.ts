import { api } from "./api";
import { Todo, TodoCreate, TodoUpdate } from "../types/todo";

export async function listTodos() {
  const res = await api.get<Todo[]>("/todos");
  return res.data;
}

export async function createTodo(data: TodoCreate) {
  const res = await api.post<Todo>("/todos", data);
  return res.data;
}

export async function updateTodo(id: number, data: TodoUpdate) {
  const res = await api.patch<Todo>(`/todos/${id}`, data);
  return res.data;
}
