<template>
  <router-view />
</template>

<script setup>
// Основной компонент теперь просто отображает роутер
</script>

<style>
/* Глобальные стили и переменные CSS */
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --danger-color: #ef4444;
  --danger-hover: #dc2626;
  --warning-color: #f59e0b;
  --warning-hover: #d97706;
  --border-color: #e5e7eb;
  --text-color: #1f2937;
  --text-muted: #6b7280;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-completed: #f3f4f6;
}

.dark-theme {
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --danger-color: #ef4444;
  --danger-hover: #dc2626;
  --warning-color: #f59e0b;
  --warning-hover: #d97706;
  --border-color: #374151;
  --text-color: #f9fafb;
  --text-muted: #9ca3af;
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --bg-completed: #374151;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button {
  font-family: inherit;
}
</style>