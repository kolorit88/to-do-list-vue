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
import { useLocalStorage } from './composables/useLocalStorage'
import TaskList from './components/TaskList.vue'
import TaskModal from './components/TaskModal.vue'
import ThemeToggle from './components/ThemeToggle.vue'

const taskStore = useTaskStore()
const { value: currentTheme } = useLocalStorage('theme', 'light')

const searchTerm = ref('')
const isModalOpen = ref(false)
const isEditing = ref(false)
const currentTask = ref(null)

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

const openAddModal = () => {
  isEditing.value = false
  currentTask.value = null
  isModalOpen.value = true
}

const openEditModal = (task) => {
  isEditing.value = true
  currentTask.value = { ...task }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  currentTask.value = null
}

const handleTaskSave = (taskData) => {
  if (isEditing.value && currentTask.value) {
    taskStore.updateTask(currentTask.value.id, taskData.title)
  } else {
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

onMounted(() => {
  taskStore.loadTasks()
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
