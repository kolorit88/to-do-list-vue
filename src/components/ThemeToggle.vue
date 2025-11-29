<script setup>
import {ref, watch} from "vue";

const currentTheme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
}

watch(currentTheme, (newTheme) => {
  document.body.className=`${newTheme}-theme`
  localStorage.setItem('theme', newTheme)
})
</script>

<template>
  <button class="theme-toggle" @click="toggleTheme">
    {{currentTheme === 'light' ? 'Темная тема': 'Светлая тема'}}
  </button>
</template>

<style scoped>

</style>