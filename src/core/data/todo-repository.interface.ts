import { TodoItem } from '@/core/models/todo-item';

export interface TodoRepository {
    getAllTodos(): TodoItem[];
    getTodo(id: string): TodoItem;
    upsertTodo(todo: TodoItem): void;
    toggleTodoIsDone(id: string): void;
    deleteTodo(id: string): void;
}