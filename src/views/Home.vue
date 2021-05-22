<template>
    <h1 class="todo-heading">Angular-Todo</h1>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Titel</th>
                <th scope="col">Fälligkeitsdatum</th>
                <th scope="col">Optionen</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="item in todoItems" :key="item.id">
                <tr :class="{ 'finished-todo': item.isDone }">
                    <td @click="router.push(`/item/${item.id}`)">
                        {{ item.title }}
                    </td>
                    <td @click="router.push(`/item/${item.id}`)">
                        {{ formatToGermanDate(item.dueDate) }}
                    </td>
                    <td class="row-options">
                        <i
                            class="bi bi-pencil"
                            @click="router.push(`/edit/${item.id}`)"
                        ></i>
                        <i
                            class="bi bi-trash text-danger"
                            @click="deleteTodo(item.id)"
                        ></i>
                        <i
                            :class="[
                                'bi text-success',
                                item.isDone ? 'bi-arrow-bar-up' : 'bi-check2',
                            ]"
                            @click="toggleTodoIsDone(item.id)"
                        ></i>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <div class="todo-add-wrapper">
        <i
            class="todo-add-icon bi bi-plus-circle-fill"
            @click="router.push('/new')"
        ></i>
    </div>
</template>

<script lang="ts">
import { useTodoItemSort } from "@/core/composables/todo-item-sort";
import { LocalTodoRepository } from "@/core/data/local-todo-repository";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "Home",
    setup() {
        const router = useRouter();
        const localTodoRepository = new LocalTodoRepository();

        const { todoItems, getSortedTodoItems } = useTodoItemSort(
            localTodoRepository
        );

        const deleteTodo = (id: string): void => {
            localTodoRepository.deleteTodo(id);
            getSortedTodoItems();
        };

        const toggleTodoIsDone = (id: string): void => {
            localTodoRepository.toggleTodoIsDone(id);
            getSortedTodoItems();
        };

        const formatToGermanDate = (date: string | Date): string => {
            return new Date(date).toLocaleDateString("de", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        };

        return {
            todoItems,
            router,
            deleteTodo,
            toggleTodoIsDone,
            formatToGermanDate,
        };
    },
});
</script>

<style lang="scss">
.todo-heading {
    text-align: center;
    margin-bottom: 2rem;
}

.row-options > i {
    font-size: 1.25rem;
}

.row-options > i:nth-child(even) {
    margin: 0 1rem;
}

.finished-todo {
    opacity: 0.5;
}

th:nth-last-child(-n + 2),
td:nth-last-child(-n + 2) {
    width: 150px;
    text-align: center;
}

tbody {
    display: block;
    height: 300px;
    overflow: auto;
}

thead,
tbody > tr {
    display: table;
    width: 100%;
    vertical-align: middle;
    // even columns width, fix width of table too
    table-layout: fixed;
}

tbody > tr:hover {
    cursor: pointer;
}

thead {
    // scrollbar is average 1em/16px width, remove it from thead width
    width: calc(100% - 16px);
}

.todo-add-wrapper {
    position: absolute;
    bottom: 20px;
    right: 40px;

    .todo-add-icon {
        font-size: 5rem;
        color: #0d6efd;
    }

    .todo-add-icon:hover {
        cursor: pointer;
    }
}
</style>
