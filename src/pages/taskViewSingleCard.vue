<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

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
  task.setName = props.setName
  task.createTask()
})



const currentCard = computed(() => task.currentCard)

const isAnswered = ref(false)
function createRevisionAnswer(event) {
  const windowWidth = document.documentElement.clientWidth
  const clickX = event.clientX
  const xPercent = ~~(clickX / windowWidth * 100) 
  const isCorrect = xPercent > 50 ? true : false // right -> true; left -> false

  return {
    isCorrect,
    time: Date.now(),
    setName: task.setName,
    card: currentCard.value,
  }
}
function onClick(event) {
  !isAnswered.value ? showAnswer() : sendAnswer(createRevisionAnswer(event) )
}
var showAnswer = () => isAnswered.value = true
var hideAnswer = () => isAnswered.value = false
var sendAnswer = (revisionAnswer) => {
  hideAnswer()
  task.onAnswer(revisionAnswer)
}


</script>

<template>
  <div class="task"
    @pointerup="onClick"
  >
    <TaskViewSingleCardQuestion
      v-if="currentCard?.question"
      :question="currentCard.question"
      :answer="currentCard.answer"
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