<template>
  <button class="theme-toggle" @click="toggleTheme">
    {{ currentTheme === 'light' ? 'Темная тема' : 'Светлая тема' }}
  </button>
</template>

<script setup>
import { ref, watch } from 'vue'

const currentTheme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
}

watch(currentTheme, (newTheme) => {
  document.body.className = `${newTheme}-theme`
  localStorage.setItem('theme', newTheme)
})
</script>

<style scoped>
.theme-toggle {
  background: var(--bg-secondary);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-1px);
}
</style>