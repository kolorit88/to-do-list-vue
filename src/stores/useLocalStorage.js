import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
    // Универсальная функция для работы с разными типами данных
    const getStoredValue = () => {
        try {
            const item = localStorage.getItem(key)
            if (item === null) return defaultValue

            // Пытаемся разобрать как JSON
            try {
                return JSON.parse(item)
            } catch {
                // Если не JSON, возвращаем как есть (для строк, например 'light', 'dark')
                return item
            }
        } catch (error) {
            console.error('Error reading from localStorage:', error)
            return defaultValue
        }
    }

    const value = ref(getStoredValue())

    const save = () => {
        try {
            if (typeof value.value === 'string' ||
                typeof value.value === 'number' ||
                typeof value.value === 'boolean') {
                // Для примитивов сохраняем как есть
                localStorage.setItem(key, value.value.toString())
            } else {
                // Для объектов и массивов используем JSON
                localStorage.setItem(key, JSON.stringify(value.value))
            }
        } catch (error) {
            console.error('Error saving to localStorage:', error)
        }
    }

    watch(value, save, { deep: true })

    return { value, save }
}