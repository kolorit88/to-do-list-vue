<template>
  <section class="tasks-section">
    <h2>{{ title }}</h2>
    <ul class="tasks-list" :class="{ 'completed-tasks': isCompleted }">
      <li
          v-if="tasks.length === 0"
          class="empty-message"
      >
        {{ isCompleted ? 'Нет выполненных задач' : 'Нет активных задач' }}
      </li>

      <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @edit="$emit('edit-task', task)"
      @delete="$emit('delete-task', task.id)"
      @toggle="$emit('toggle-task', task.id)"
      />
    </ul>
  </section>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  title: String,
  tasks: Array,
  isCompleted: Boolean
})

defineEmits(['edit-task', 'delete-task', 'toggle-task'])
</script>

<style scoped>
.tasks-section {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border-color);
}

.tasks-section h2 {
  color: var(--text-color);
  margin: 0 0 15px 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.tasks-list {
  list-style: none;
  padding: 0;
  margin: 0;
  min-height: 100px;
}

.empty-message {
  text-align: center;
  color: var(--text-muted);
  padding: 40px 20px;
  font-style: italic;
}
</style>