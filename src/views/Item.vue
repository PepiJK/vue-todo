<template>
    <form class="d-flex flex-column h-100 justify-content-between">
        <div>
            <div class="row">
                <div class="col-8">
                    <label for="title" class="form-label">Titel</label>
                    <input
                        id="title"
                        type="text"
                        class="form-control"
                        v-bind:disabled="!isFormEnabled"
                        v-model="todoItem.title"
                    />
                </div>
                <div class="col">
                    <label for="id" class="form-label">Id</label>
                    <input
                        title="id"
                        type="text"
                        class="form-control"
                        disabled
                        v-model="todoItem.id"
                    />
                </div>
            </div>
            <div class="row mt-4">
                <div class="col">
                    <label for="description" class="form-label"
                        >Beschreibung</label
                    >
                    <textarea
                        id="description"
                        class="form-control"
                        v-bind:disabled="!isFormEnabled"
                        v-model="todoItem.description"
                    ></textarea>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col">
                    <label for="due-date" class="form-label"
                        >Fälligkeitsdatum</label
                    >
                    <input
                        id="due-date"
                        class="form-control"
                        type="date"
                        v-bind:disabled="!isFormEnabled"
                        v-model="todoItem.dueDate"
                    />
                </div>
            </div>
        </div>
        <div>
            <div class="row">
                <div class="col">
                    <button
                        @click="router.push('/')"
                        type="button"
                        class="btn btn-secondary"
                    >
                        <i class="bi bi-arrow-left"></i>
                        Zurück
                    </button>
                </div>
                <div
                    v-if="isFormEnabled"
                    class="col d-flex justify-content-end"
                >
                    <button
                        @click="submit()"
                        type="submit"
                        class="btn btn-primary"
                        v-bind:disabled="!isFormValid"
                    >
                        <i class="bi bi-check2"></i>
                        Speichern
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, defineComponent, ref } from "vue";
import { LocalTodoRepository } from "@/core/data/local-todo-repository";
import { TodoItem } from "@/core/models/todo-item";

export default defineComponent({
    name: "Item",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const localTodoRepository = new LocalTodoRepository();

        const todoItem = ref<TodoItem>({
            id: "",
            title: "",
            description: "",
            dueDate: "",
            isDone: false,
        });
        const isFormEnabled = ref(false);

        const type = route.path.split("/")[1];
        switch (type) {
            case "new": {
                isFormEnabled.value = true;
                break;
            }
            case "edit": {
                isFormEnabled.value = true;
                const id = route.params.id as string;
                if (id) {
                    todoItem.value = localTodoRepository.getTodo(id);
                    todoItem.value.dueDate = new Date(todoItem.value.dueDate)
                        .toISOString()
                        .split("T")[0];
                }
                break;
            }
            case "item": {
                const id = route.params.id as string;
                if (id) {
                    todoItem.value = localTodoRepository.getTodo(id);
                    todoItem.value.dueDate = new Date(todoItem.value.dueDate)
                        .toISOString()
                        .split("T")[0];
                }
                break;
            }
        }

        const isFormValid = computed(() => {
            if (todoItem?.value?.title?.length && todoItem?.value?.dueDate) {
                return true;
            }
            return false;
        });

        const submit = () => {
            if (todoItem.value) {
                localTodoRepository.upsertTodo(todoItem.value);
                router.push("/");
            }
        };

        return {
            router,
            todoItem,
            isFormEnabled,
            isFormValid,
            submit,
        };
    },
});
</script>

<style lang="scss">
button {
    display: flex !important;
    align-items: center !important;
}

button > * {
    font-size: 1.25rem;
}

button > i {
    margin-right: 0.5rem;
}
</style>
