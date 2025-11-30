<template>
  <div
      class="modal-overlay"
      :class="{ active: isOpen }"
      @click="handleOverlayClick"
  >
    <div class="modal-content" @click.stop>
      <h3>{{ isEditing ? 'Редактировать задачу' : 'Добавить задачу' }}</h3>
      <form @submit.prevent="handleSubmit">
        <label for="task-input"></label>
        <input
            type="text"
            id="task-input"
            placeholder="Название задачи"
            required
            v-model="taskTitle"
            ref="inputRef"
        >
        <div class="modal-actions">
          <button type="button" class="cancel-btn" @click="$emit('close')">
            Отмена
          </button>
          <button type="submit" class="save-btn">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  isEditing: Boolean,
  currentTask: {  // Исправляем тип пропса
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const taskTitle = ref('')
const inputRef = ref(null)

// Сброс формы при открытии/закрытии
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      inputRef.value?.focus()
    })

    if (props.isEditing && props.currentTask) {
      // Если редактируем - берем title из объекта задачи
      taskTitle.value = props.currentTask.title
    } else {
      // Если добавляем новую - очищаем поле
      taskTitle.value = ''
    }
  }
})

// Обработка клика по оверлею
const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

// Обработка отправки формы
const handleSubmit = () => {
  if (taskTitle.value.trim()) {
    emit('save', {title: taskTitle.value.trim()})
    taskTitle.value = ''
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: var(--bg-primary);
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transform: scale(0.7);
  transition: transform 0.3s ease;
}

.modal-overlay.active .modal-content {
  transform: scale(1);
}

.modal-content h3 {
  color: var(--text-color);
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  text-align: center;
}

.modal-content input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-color);
  font-size: 16px;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;
}

.modal-content input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.modal-content input::placeholder {
  color: var(--text-muted);
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.cancel-btn, .save-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-btn {
  background: var(--bg-secondary);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.cancel-btn:hover {
  background: var(--border-color);
}

.save-btn {
  background: var(--primary-color);
  color: white;
}

.save-btn:hover {
  background: var(--primary-hover);
}
</style>