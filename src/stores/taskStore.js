import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'

export const useTaskStore = defineStore('tasks', () => {
    const { value: tasks, save: saveTasks } = useLocalStorage('tasks', [])

    const loadTasks = () => {
        // Данные уже загружаются автоматически через useLocalStorage
    }

    const addTask = (title) => {
        const newTask = {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date().toISOString()
        }

        tasks.value.unshift(newTask)
        saveTasks()
    }

    const updateTask = (taskId, title) => {
        const task = tasks.value.find(t => t.id === taskId)
        if (task) {
            task.title = title
            saveTasks()
        }
    }

    const deleteTask = (taskId) => {
        const taskIndex = tasks.value.findIndex(t => t.id === taskId)
        if (taskIndex !== -1) {
            tasks.value.splice(taskIndex, 1)
            saveTasks()
        }
    }

    const toggleTaskCompletion = (taskId) => {
        const task = tasks.value.find(t => t.id === taskId)
        if (task) {
            task.completed = !task.completed
            saveTasks()
        }
    }

    return {
        tasks,
        loadTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion
    }
})