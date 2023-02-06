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
onMounted(() => {
  // console.log('upda')
  task.setName = props.setName
  task.createTask()
})

onBeforeRouteUpdate(() => {
  // console.log('update')
})


const currentQuestionData = computed(() => task.currentQuestionData)

const isAnswered = ref(false)
function defineAnswerResault(event) {
  const windowWidth = document.documentElement.clientWidth
  const clickX = event.clientX
  const xPercent = ~~(clickX / windowWidth * 100) 
  return xPercent > 50 ? true : false // right -> true; left -> false
}
function onClick(event) {
  !isAnswered.value ? showAnswer() : sendAnswer(defineAnswerResault(event) )
}
var showAnswer = () => isAnswered.value = true
var sendAnswer = (answerResault) => task.answerQuestion(answerResault)
watch(currentQuestionData, () => isAnswered.value = false)


</script>

<template>
  <div class="task"

    @pointerup="onClick"
  >
    <TaskViewSingleCardQuestion
      v-if="currentQuestionData.question"
      :question="currentQuestionData.question"
      :answer="currentQuestionData.answer"
      :isShownAnswer="isAnswered"
    ></TaskViewSingleCardQuestion>
  </div>
</template>

<style scoped lang="pcss">
@import '@/assets/css/_vars';


.task {
  height: 100%;
}

</style>