<script setup xmlns="http://www.w3.org/1999/html">

import TaskItem from "@/components/TaskItem.vue";
defineProps({
  title: String,
  tasks: Array,
  isCompleted: Boolean
})

defineEmits(['edit-task', 'delete-task', 'toggle-task'])
</script>

<template>
  <section class="task-section"> <h2>{{title}}}</h2>
    <ul class="tasks-list" :class="{'completed-task': isCompleted}">
      <li v-if="tasks.length === 0"
      class="empty-message">
      {{isCompleted ? 'Нет выполненных задач' : 'Нет активных задач'}}
      </li>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="() => $emit('edit-task', 'task')"
        @delete="() => $emit('delete-task', task.id)"
        @toggle="() => $emit('toggle-task', task.id)"
      />
    </ul>
  </section>
</template>

<style scoped>

</style>