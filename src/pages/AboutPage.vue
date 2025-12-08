<template>
  <div :class="`about-page ${currentTheme}-theme`">
    <div class="about-container">
      <header class="about-header">
        <h1>О приложении To-Do List</h1>
        <nav class="about-nav">
          <router-link v-if="userStore.isAuthenticated" to="/todo" class="nav-link">
            ← К задачам
          </router-link>
          <router-link v-else to="/login" class="nav-link">
            ← К авторизации
          </router-link>
        </nav>
      </header>

      <main class="about-content">
        <section class="hero-section">
          <div class="hero-text">
            <h2>Организуйте свою жизнь с нашим To-Do List</h2>
            <p>Простое, интуитивно понятное приложение для управления вашими задачами</p>
          </div>
          <div class="hero-image">
            <div class="todo-animation">
              <div class="task-item-anim" v-for="n in 3" :key="n" :style="{ animationDelay: `${(n-1)*0.2}s` }">
                <div class="check-anim"></div>
                <div class="text-anim"></div>
              </div>
            </div>
          </div>
        </section>

        <section class="features-section">
          <h2>Основные возможности</h2>
          <div class="features-grid">
            <div class="feature-card" v-for="feature in features" :key="feature.title">
              <div class="feature-icon">{{ feature.icon }}</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </section>

        <section class="stats-section" v-if="userStore.isAuthenticated">
          <h2>Ваша статистика</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">{{ taskStore.activeUserTasks.length }}</div>
              <div class="stat-label">Активных задач</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ taskStore.completedUserTasks.length }}</div>
              <div class="stat-label">Выполненных задач</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ taskStore.userTasks.length }}</div>
              <div class="stat-label">Всего задач</div>
            </div>
          </div>
        </section>

        <section class="tech-section">
          <h2>Технологии</h2>
          <div class="tech-tags">
            <span class="tech-tag">Vue 3</span>
            <span class="tech-tag">Pinia</span>
            <span class="tech-tag">Vue Router</span>
            <span class="tech-tag">Composition API</span>
            <span class="tech-tag">LocalStorage</span>
          </div>
        </section>

        <section class="fun-section">
          <h2>🎉 Интересные факты</h2>
          <div class="fun-facts">
            <div class="fun-fact">
              <span class="fact-icon">📱</span>
              <p>Приложение адаптировано под все устройства</p>
            </div>
            <div class="fun-fact">
              <span class="fact-icon">🎨</span>
              <p>Поддержка светлой и темной тем</p>
            </div>
            <div class="fun-fact">
              <span class="fact-icon">🔒</span>
              <p>Каждый пользователь видит только свои задачи</p>
            </div>
          </div>
        </section>

        <section class="quote-section">
          <blockquote>
            "Продуктивность никогда не была случайностью. Это всегда результат стремления к совершенству,
            разумного планирования и целенаправленных усилий."
            <footer>— Пол Дж. Мейер</footer>
          </blockquote>
        </section>

        <section class="developer-section">
          <h2>Разработчик</h2>
          <div class="developer-card">
            <div class="developer-info">
              <h3>Студент</h3>
              <p>Этот проект был создан в рамках учебного задания по изучению Vue.js и современного фронтенда.</p>
              <p>Цель: закрепить навыки работы с Vue 3, Pinia, Vue Router и архитектурой SPA-приложений.</p>
            </div>
          </div>
        </section>
      </main>

      <footer class="about-footer">
        <p>© {{ currentYear }} To-Do List App. Учебный проект.</p>
        <p>Версия 2.0 (с авторизацией и многопользовательской поддержкой)</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useUserStore } from '../stores/userStore'
import { useLocalStorage } from '../stores/useLocalStorage'

const taskStore = useTaskStore()
const userStore = useUserStore()
const { value: currentTheme } = useLocalStorage('theme', 'light')

const currentYear = new Date().getFullYear()

const features = [
  {
    icon: '✓',
    title: 'Управление задачами',
    description: 'Добавляйте, редактируйте и удаляйте задачи. Отмечайте выполненные.'
  },
  {
    icon: '👤',
    title: 'Многопользовательский режим',
    description: 'Каждый пользователь имеет свой изолированный список задач.'
  },
  {
    icon: '🔍',
    title: 'Поиск',
    description: 'Быстрый поиск по всем вашим задачам.'
  },
  {
    icon: '🎨',
    title: 'Темы',
    description: 'Светлая и темная темы для комфортной работы в любое время суток.'
  },
  {
    icon: '💾',
    title: 'Автосохранение',
    description: 'Все данные автоматически сохраняются в вашем браузере.'
  },
  {
    icon: '📱',
    title: 'Адаптивность',
    description: 'Работает на всех устройствах: от смартфонов до десктопов.'
  }
]
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-color);
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.about-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--border-color);
}

.about-header h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.about-nav {
  margin-top: 20px;
}

.nav-link {
  display: inline-block;
  padding: 10px 20px;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background: var(--primary-hover);
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 60px;
  padding: 40px;
  background: var(--bg-secondary);
  border-radius: 20px;
}

@media (min-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr 1fr;
  }
}

.hero-text h2 {
  font-size: 2.2rem;
  margin-bottom: 20px;
  color: var(--text-color);
}

.hero-text p {
  font-size: 1.2rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.todo-animation {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 2px solid var(--border-color);
}

.task-item-anim {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--bg-secondary);
  border-radius: 8px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

.check-anim {
  width: 20px;
  height: 20px;
  border: 2px solid var(--primary-color);
  border-radius: 4px;
}

.text-anim {
  height: 14px;
  background: var(--border-color);
  border-radius: 4px;
  flex: 1;
}

.features-section {
  margin-bottom: 60px;
}

.features-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  color: var(--text-color);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  padding: 30px;
  background: var(--bg-secondary);
  border-radius: 15px;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--text-color);
}

.feature-card p {
  color: var(--text-muted);
  line-height: 1.6;
}

.stats-section {
  margin-bottom: 60px;
  padding: 40px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  border-radius: 20px;
  color: white;
}

.stats-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-card {
  text-align: center;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 1.2rem;
  opacity: 0.9;
}

.tech-section {
  margin-bottom: 60px;
}

.tech-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: var(--text-color);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.tech-tag {
  padding: 12px 24px;
  background: var(--bg-secondary);
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: var(--primary-color);
  color: white;
  transform: scale(1.05);
}

.fun-section {
  margin-bottom: 60px;
}

.fun-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  color: var(--text-color);
}

.fun-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.fun-fact {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: var(--bg-secondary);
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.fun-fact:hover {
  transform: translateX(10px);
}

.fact-icon {
  font-size: 2.5rem;
}

.fun-fact p {
  color: var(--text-color);
  font-size: 1.1rem;
  margin: 0;
}

.quote-section {
  margin-bottom: 60px;
  padding: 50px;
  background: var(--bg-secondary);
  border-radius: 20px;
  border-left: 5px solid var(--primary-color);
}

blockquote {
  font-size: 1.5rem;
  font-style: italic;
  color: var(--text-color);
  margin: 0;
  line-height: 1.6;
}

blockquote footer {
  margin-top: 20px;
  font-size: 1rem;
  color: var(--text-muted);
  font-style: normal;
}

.developer-section {
  margin-bottom: 60px;
}

.developer-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  color: var(--text-color);
}

.developer-card {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: var(--bg-secondary);
  border-radius: 20px;
  text-align: center;
}

.developer-info h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.developer-info p {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 15px;
}

.about-footer {
  text-align: center;
  padding: 40px 20px;
  border-top: 2px solid var(--border-color);
  color: var(--text-muted);
}

.about-footer p {
  margin: 10px 0;
}
</style>