<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import TaskViewSingleCardQuestion from '@/components/TaskViewSingleCardQuestion.vue'

import { useStoreTask } from '@/stores/task.js'

const props = defineProps({
  setName: {
    type: String,
    required: true,
  },
})


const task = useStoreTask()
task.setName = props.setName
task.createTask()


const currentQuestionData = computed(() => task.currentQuestionData)

const isAnswered = ref(false)
var onClick = () => !isAnswered.value ? showAnswer() : sendAnswer()
var showAnswer = () => isAnswered.value = true
function sendAnswer() {
  
}
watch(currentQuestionData, () => isAnswered.value = false)


</script>

<template>
  <div class="task"

    @pointerup="onClick"
  >
    <!-- <TaskViewSingleCardQuestion
      :question="currentQuestionData.question"
      :answer="currentQuestionData.answer"
      :isShownAnswer="isAnswered"
    ></TaskViewSingleCardQuestion> -->
  </div>
</template>

<style scoped lang="pcss">
@import '@/assets/css/_vars';


.task {
  height: 100%;
}

</style>