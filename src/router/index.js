import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'

// Импортируем компоненты страниц
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import TodoPage from '../pages/TodoPage.vue'
import AboutPage from '../pages/AboutPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/todo'
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: { requiresGuest: true }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        meta: { requiresGuest: true }
    },
    {
        path: '/todo',
        name: 'todo',
        component: TodoPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/about',
        name: 'about',
        component: AboutPage
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/todo'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Защита маршрутов
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    // Если маршрут требует авторизации, а пользователь не авторизован
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        next('/login')
        return
    }

    // Если маршрут требует быть гостем, а пользователь авторизован
    if (to.meta.requiresGuest && userStore.isAuthenticated) {
        next('/todo')
        return
    }

    next()
})

export default router