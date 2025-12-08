import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([])
    const userStore = useUserStore()

    // Фильтруем задачи по текущему пользователю
    const userTasks = computed(() => {
        if (!userStore.currentUser) return []
        return tasks.value.filter(task => task.userId === userStore.currentUser.id)
    })

    // Отфильтрованные активные задачи текущего пользователя
    const activeUserTasks = computed(() =>
        userTasks.value.filter(task => !task.completed)
    )

    // Отфильтрованные выполненные задачи текущего пользователя
    const completedUserTasks = computed(() =>
        userTasks.value.filter(task => task.completed)
    )

    const addTask = (title) => {
        if (!userStore.currentUser) return

        const newTask = {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
            userId: userStore.currentUser.id // Привязываем задачу к пользователю
        }

        tasks.value.unshift(newTask)
    }

    const updateTask = (taskId, title) => {
        const task = tasks.value.find(t => t.id === taskId)
        if (task && task.userId === userStore.currentUser?.id) {
            task.title = title
        }
    }

    const deleteTask = (taskId) => {
        const taskIndex = tasks.value.findIndex(t =>
            t.id === taskId && t.userId === userStore.currentUser?.id
        )
        if (taskIndex !== -1) {
            tasks.value.splice(taskIndex, 1)
        }
    }

    const toggleTaskCompletion = (taskId) => {
        const task = tasks.value.find(t =>
            t.id === taskId && t.userId === userStore.currentUser?.id
        )
        if (task) {
            task.completed = !task.completed
        }
    }

    // Фильтрация для поиска (только задачи текущего пользователя)
    const searchTasks = (searchTerm) => {
        if (!searchTerm) return userTasks.value

        return userTasks.value.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    return {
        tasks,
        userTasks,
        activeUserTasks,
        completedUserTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        searchTasks
    }
}, {
    persist: {
        key: 'todo-tasks',
        storage: localStorage
    }
})
