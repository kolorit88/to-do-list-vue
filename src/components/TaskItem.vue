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
    <li class="task-item" :class="{completed : task.completed}">
      <input type="checkbox" class="task-checkbox" :checked="task.completed" @change="$emit('toggle')">
      <span class="task-title"> {{task.title}} </span>
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

</style>