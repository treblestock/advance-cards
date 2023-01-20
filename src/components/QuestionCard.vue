<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'


const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
})




const isShownAnswer = ref(false)
const toggleIsShownAnswer = () => isShownAnswer.value = !isShownAnswer.value

</script>

<template>
  <div class="question-card"
    @click="toggleIsShownAnswer"
    @dblclick="$emit('question-answered', question)"
  >
    <div class="question-card__question">{{ question }}</div>
    <div class="question-card__answer" :class="{_hidden: !isShownAnswer}">{{ answer }}</div>
  </div>
</template>

<style scoped lang="sass">

.question-card
  width: 60rem
  display: flex

  cursor: pointer
  &__question
    padding: 1rem
    flex: 0 0 20%
    border-right: 1px solid #000

  &__answer
    padding: 1rem
    flex: 0 0 80%

    &._hidden
      font-size: 0



</style>