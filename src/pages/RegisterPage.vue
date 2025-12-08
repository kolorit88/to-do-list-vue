<template>
  <div class="auth-page">
    <div class="auth-container">
      <h1>Регистрация</h1>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
              type="email"
              id="email"
              v-model="form.email"
              placeholder="Введите ваш email"
              required
              :class="{ 'error': errors.email }"
              @blur="checkEmail"
          >
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>
          <input
              type="password"
              id="password"
              v-model="form.password"
              placeholder="Введите пароль (минимум 6 символов)"
              required
              :class="{ 'error': errors.password }"
          >
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Подтверждение пароля</label>
          <input
              type="password"
              id="confirmPassword"
              v-model="form.confirmPassword"
              placeholder="Повторите пароль"
              required
              :class="{ 'error': errors.confirmPassword }"
          >
          <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
        </div>

        <div v-if="errorMessage" class="error-message general-error">
          {{ errorMessage }}
        </div>

        <button type="submit" class="auth-btn" :disabled="isLoading">
          {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
      </form>

      <div class="auth-links">
        <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
        <router-link to="/about" class="about-link">О приложении</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({})
const errorMessage = ref('')
const isLoading = ref(false)

const checkEmail = async () => {
  if (!form.value.email) return

  if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Некорректный email'
  } else if (!userStore.isEmailUnique(form.value.email)) {
    errors.value.email = 'Этот email уже занят'
  } else {
    delete errors.value.email
  }
}

const validateForm = () => {
  errors.value = {}

  if (!form.value.email) {
    errors.value.email = 'Email обязателен'
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Некорректный email'
  }

  if (!form.value.password) {
    errors.value.password = 'Пароль обязателен'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Пароль должен быть не менее 6 символов'
  }

  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Подтвердите пароль'
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Пароли не совпадают'
  }

  return Object.keys(errors.value).length === 0
}

const handleRegister = async () => {
  if (!validateForm()) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    await userStore.register(form.value.email, form.value.password)
    router.push('/todo')
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: 20px;
}

.auth-container {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.auth-container h1 {
  color: var(--text-color);
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.auth-form {
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: var(--text-color);
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-color);
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group input.error {
  border-color: var(--danger-color);
}

.error-message {
  color: var(--danger-color);
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.general-error {
  text-align: center;
  margin: 15px 0;
  font-size: 14px;
}

.auth-btn {
  width: 100%;
  padding: 14px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.auth-btn:hover:not(:disabled) {
  background: var(--primary-hover);
}

.auth-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-links {
  text-align: center;
  color: var(--text-muted);
}

.auth-links a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.auth-links a:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

.about-link {
  display: inline-block;
  margin-top: 10px;
  font-size: 14px;
}
</style>