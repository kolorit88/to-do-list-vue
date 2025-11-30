
<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete', 'toggle'])
</script>

<template>
  <li class="task-item" :class="{ completed: task.completed }">
    <input
        type="checkbox"
        class="task-checkbox"
        :checked="task.completed"
        @change="$emit('toggle')"
    >
    <span class="task-title">{{ task.title }}</span>
    <div class="task-actions">
      <button class="edit-btn" @click="$emit('edit')">
        Редактировать
      </button>
      <button class="delete-btn" @click="$emit('delete')">
        Удалить
      </button>
    </div>
  </li>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.task-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.task-item.completed {
  opacity: 0.7;
  background: var(--bg-completed);
}

.task-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary-color);
}

.task-title {
  flex: 1;
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.4;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: var(--text-muted);
}

.task-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.task-item:hover .task-actions {
  opacity: 1;
}

.edit-btn, .delete-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background: var(--warning-color);
  color: white;
}

.edit-btn:hover {
  background: var(--warning-hover);
}

.delete-btn {
  background: var(--danger-color);
  color: white;
}

.delete-btn:hover {
  background: var(--danger-hover);
}

@media (max-width: 480px) {
  .task-actions {
    opacity: 1;
    flex-direction: column;
  }

  .edit-btn, .delete-btn {
    padding: 4px 8px;
    font-size: 11px;
  }
}
</style>