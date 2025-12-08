<template>
  <div :class="`container ${currentTheme}-theme`">
    <header class="header">
      <h1>Мои задачи</h1>
      <div class="header-actions">
        <span class="user-email">{{ userStore.currentUser?.email }}</span>
        <ThemeToggle />
        <button @click="handleLogout" class="logout-btn">Выйти</button>
        <router-link to="/about" class="about-btn">О приложении</router-link>
      </div>
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
          :tasks="searchedActiveTasks"
          :is-completed="false"
          @edit-task="openEditModal"
          @delete-task="deleteTask"
          @toggle-task="toggleTaskCompletion"
      />

      <TaskList
          title="Выполненные задачи"
          :tasks="searchedCompletedTasks"
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
import { useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'
import { useUserStore } from '../stores/userStore'
import TaskList from '../components/TaskList.vue'
import TaskModal from '../components/TaskModal.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import { useLocalStorage } from '../stores/useLocalStorage'

const router = useRouter()
const taskStore = useTaskStore()
const userStore = useUserStore()

const { value: currentTheme } = useLocalStorage('theme', 'light')
const searchTerm = ref('')
const isModalOpen = ref(false)
const isEditing = ref(false)
const currentTask = ref(null)

// Проверяем авторизацию
onMounted(() => {
  if (!userStore.isAuthenticated) {
    router.push('/login')
  }
})

// Отфильтрованные задачи с учетом поиска
const searchedTasks = computed(() => {
  return taskStore.searchTasks(searchTerm.value)
})

const searchedActiveTasks = computed(() =>
    searchedTasks.value.filter(task => !task.completed)
)

const searchedCompletedTasks = computed(() =>
    searchedTasks.value.filter(task => task.completed)
)

// Методы модального окна
const openAddModal = () => {
  if (!userStore.isAuthenticated) return

  isEditing.value = false
  currentTask.value = null
  isModalOpen.value = true
}

const openEditModal = (task) => {
  isEditing.value = true
  currentTask.value = task
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

const handleLogout = () => {
  if (confirm('Вы действительно хотите выйти?')) {
    userStore.logout()
  }
}
</script>

<style scoped>
.container {
  max-width: 1000px;
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
  flex-wrap: wrap;
  gap: 15px;
}

.header h1 {
  color: var(--text-color);
  margin: 0;
  font-size: 2rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.user-email {
  color: var(--text-muted);
  font-size: 14px;
  background: var(--bg-secondary);
  padding: 6px 12px;
  border-radius: 20px;
}

.logout-btn, .about-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.logout-btn {
  background: var(--danger-color);
  color: white;
}

.logout-btn:hover {
  background: var(--danger-hover);
}

.about-btn {
  background: var(--bg-secondary);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.about-btn:hover {
  background: var(--border-color);
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