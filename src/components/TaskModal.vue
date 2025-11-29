<script setup>
import {ref, watch, nextTick} from "vue";

const emit = defineEmits(['close', 'save'])
const taskTitle = ref('')
const inputRef = ref(null)

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      inputRef.value?.focus()
    })

    if (props.isEditing && props.currentTask) {
      taskTitle.value = props.currentTask.title
    } else {
      taskTitle.value = ''
    }
  }
})

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

const handleSubmit = () => {
  if (taskTitle.value.trim()) {
    emit('save', { title: taskTitle.value.trim() })
    taskTitle.value = ''
  }
}

</script>

<template>
  <div class="modal-overlay"
       :class="{ active:isOpen }"
       @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <h3>{{isEditing ? 'Редактировать задачи' : 'Добавить задачу'}}</h3>
      <from @sumbit.prevent="handleSumbit">
        <label for="task-input"></label>
        <input type="text"
               id="task-input"
               placeholder="Название задач"
               required
               v-model="taskTitle"
               ref="inputRef"
        >
        <div class="modal-actions">
          <button type="button"
                  class="cancel-btn"
                  @click="$emit('close')">
            Отмена
          </button>
          <button type="submit" class="save-btn">
            Сохранить
          </button>
        </div>
      </from>
    </div>
  </div>
</template>

<style scoped>

</style>