import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
    const currentUser = ref(null)
    const users = ref([])
    const router = useRouter()

    // Проверка уникальности email
    const isEmailUnique = (email) => {
        return !users.value.some(user => user.email === email)
    }

    // Регистрация
    const register = (email, password) => {
        if (!isEmailUnique(email)) {
            throw new Error('Пользователь с таким email уже существует')
        }

        const newUser = {
            id: Date.now().toString(),
            email,
            password, // В реальном приложении пароль должен хешироваться
            createdAt: new Date().toISOString()
        }

        users.value.push(newUser)
        currentUser.value = newUser

        return newUser
    }

    // Авторизация
    const login = (email, password) => {
        const user = users.value.find(u =>
            u.email === email && u.password === password
        )

        if (!user) {
            throw new Error('Неверный email или пароль')
        }

        currentUser.value = user
        return user
    }

    // Выход
    const logout = () => {
        currentUser.value = null
        router.push('/login')
    }

    // Проверка авторизации
    const isAuthenticated = computed(() => !!currentUser.value)

    return {
        currentUser,
        users,
        register,
        login,
        logout,
        isAuthenticated,
        isEmailUnique
    }
}, {
    persist: {
        key: 'todo-users',
        storage: localStorage
    }
})