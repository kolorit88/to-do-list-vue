<template>
  <div :class="`container ${currentTheme}-theme`">
    <header class="header">
      <h1>To-Do List</h1>
      <ThemeToggle />
    </header>

    <div class="search-container">
      <input
          type="text"
          class="search-input"
          placeholder="Поиск задач..."
          v-model="searchTerm"
      >
    </div>

    <div class="add-task-container">
      <button class="add-task-btn" @click="openAddModal">
        Добавить задачу
      </button>
    </div>

    <main class="tasks-container">
      <TaskList
          title="Активные задачи"
          :tasks="activeTasks"
          :is-completed="false"
          @edit-task="openEditModal"
          @delete-task="deleteTask"
          @toggle-task="toggleTaskCompletion"
      />

      <TaskList
          title="Выполненные задачи"
          :tasks="completedTasks"
          :is-completed="true"
          @edit-task="openEditModal"
          @delete-task="deleteTask"
          @toggle-task="toggleTaskCompletion"
      />
    </main>

    <TaskModal
        :is-open="isModalOpen"
        :is-editing="isEditing"
        :current-task="currentTask"
        @close="closeModal"
        @save="handleTaskSave"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from './stores/taskStore'
import TaskList from './components/TaskList.vue'
import TaskModal from './components/TaskModal.vue'
import ThemeToggle from './components/ThemeToggle.vue'

import { useLocalStorage } from './stores/useLocalStorage'

const taskStore = useTaskStore()
const { value: currentTheme } = useLocalStorage('theme', 'light')

const searchTerm = ref('')
const isModalOpen = ref(false)
const isEditing = ref(false)
const currentTask = ref(null) // Должен быть объектом или null

// Компьютеды для фильтрации задач
const filteredTasks = computed(() => {
  if (!searchTerm.value) return taskStore.tasks

  return taskStore.tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const activeTasks = computed(() =>
    filteredTasks.value.filter(task => !task.completed)
)

const completedTasks = computed(() =>
    filteredTasks.value.filter(task => task.completed)
)

// Методы модального окна
const openAddModal = () => {
  isEditing.value = false
  currentTask.value = null // Для добавления - null
  isModalOpen.value = true
}

const openEditModal = (task) => {
  console.log('Editing task:', task) // Для отладки
  isEditing.value = true
  currentTask.value = task // Передаем объект задачи, а не строку
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  currentTask.value = null
}

const handleTaskSave = (taskData) => {
  if (isEditing.value && currentTask.value) {
    // Редактирование существующей задачи
    taskStore.updateTask(currentTask.value.id, taskData.title)
  } else {
    // Добавление новой задачи
    taskStore.addTask(taskData.title)
  }
  closeModal()
}

const deleteTask = (taskId) => {
  if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
    taskStore.deleteTask(taskId)
  }
}

const toggleTaskCompletion = (taskId) => {
  taskStore.toggleTaskCompletion(taskId)
}

// Инициализация
onMounted(() => {
  taskStore.loadTasks()
})
</script>

<style scoped>
/* Стили App.vue */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--border-color);
}

.header h1 {
  color: var(--text-color);
  margin: 0;
  font-size: 2.5rem;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-color);
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.add-task-container {
  margin-bottom: 30px;
  text-align: center;
}

.add-task-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-task-btn:hover {
  background: var(--primary-hover);
}

.tasks-container {
  display: grid;
  gap: 30px;
}

@media (min-width: 768px) {
  .tasks-container {
    grid-template-columns: 1fr 1fr;
  }
}
</style>