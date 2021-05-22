import { onMounted, ref } from 'vue';

import { TodoRepository } from '../data/todo-repository.interface';
import { TodoItem } from '../models/todo-item';

// eslint-disable-next-line
export function useTodoItemSort(repository: TodoRepository) {
    const todoItems = ref<TodoItem[]>([]);
    const getSortedTodoItems = (): void => {
        todoItems.value = repository.getAllTodos()
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .sort((a, b) => Number(a.isDone) - Number(b.isDone));
    }

    onMounted(getSortedTodoItems);

    return {
        todoItems,
        getSortedTodoItems
    }
}
