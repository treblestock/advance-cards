<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'


import { useStoreTask } from '@/stores/task.js'

import vAddClass from '@/components/directives/AddClass.js'

const props = defineProps({
  setName: {
    type: String,
    required: true,
  },
})


const task = useStoreTask()
const LOWER_LIMIT = 20
const UPPER_LIMIT = 30
onMounted(() => {
  task.setName = props.setName
  task.createTask()
  setCardsCount(UPPER_LIMIT)
})


const cards = ref([])
function setCardsCount(n) {
  const cardsCountShouldBe = n ? Math.min(task.toRevise.size, n) : task.toRevise.size

  cards.value = cards.value.filter(card => card)
  const prevCardsCount = cards.value.length
  const cardsCountToFetch = cardsCountShouldBe - prevCardsCount
  if (cardsCountToFetch < 1) return

  cards.value.length = Math.max(prevCardsCount, cardsCountShouldBe)

  for (let i = 0; i < cardsCountToFetch; i) {
    const card = task.currentCard
    if (cards.value.includes(card) ) {
      task.iterateTask()
      continue
    }
    i++
    cards.value[prevCardsCount + i] = card
    task.iterateTask()
  }
}



// answer
function onClick(event) {
  const target = event.target
  const cardInd = +target.dataset.cardInd

  if (!Number.isInteger(cardInd) ) return

  if (target.classList.contains('answer') ) showAnswer(target)
  if (target.classList.contains('btn') ) onAnswer(cardInd)
}

const isShowAllAnswers = ref(false)
function showAnswer(target) {
  target.classList.remove('_hidden')
}
function showAllAnswers() {
  isShowAllAnswers.value = true
  document.querySelectorAll('.answer')
    .forEach(elem => elem.classList.remove('_hidden'))
}
function onAnswer(cardInd) {
  const revisionAnswer = createRevisionAnswer(cardInd)
  if (revisionAnswer.isCorrect) cards.value[cardInd] = null
  sendAnswer(revisionAnswer)
  if (cards.value.filter(card => card).length < LOWER_LIMIT) setCardsCount(UPPER_LIMIT)
}
function createRevisionAnswer(cardInd) {
  const card = cards.value[cardInd]

  return {
    isCorrect: true,
    time: Date.now(),
    setName: task.setName,
    card,
  }
}
function sendAnswer(revisionAnswer) {
  task.onAnswer(revisionAnswer)
}


</script>

<template>
  <div>
    <div class="task"
      @pointerup="onClick"
    >
      <Btn
        @click="showAllAnswers"
      >show all answers</Btn>
      <template
        v-for="card, ind in cards" :key="card?.question || ind"
      >
        <div class="task__row task-row"
          ref="cardsHtml"
          v-if="card"
        >
          <div class="task-row__question"
            :data-card-ind="ind"
          >
            {{ card.question }}
          </div>
          <div class="task-row__answer answer"
            v-add-class:_hidden="!isShowAllAnswers"
            :data-card-ind="ind"
          >
            {{ card.answer }}
          </div>
          <Btn class="btn"
            :data-card-ind="ind"
          >&#x2713;</Btn>
        </div>
      </template>

    </div>
  </div>  
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";

.task {

  &__row {
  }
}
.task-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;

  &__question,
  &__answer {
    flex: 0 1 50%;
  }

  &__question {
  }

  &__answer {
  }

}
._hidden {
  color: #fff;
}

</style>