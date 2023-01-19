<script setup>
import { computed } from 'vue'

import QuestionCard from '@/components/QuestionCard.vue'

const props = defineProps({
  set: {
    type: Object,
    required: true,
  },
  setName: {
    type: String,
    required: true,
  }
})


const setShuffled = computed(() => {
  const copy = Object.entries(props.set)

  copy.forEach((_, ind) => {
    const randomInd = ~~(Math.random() * copy.length)
    ;[copy[ind], copy[randomInd]] = [copy[randomInd], copy[ind]]
  })
  return copy
})




</script>

<template>
  <div class="set">
    <div class="set__name">
      {{ setName }}
    </div>
    <div class="set__question-cards">
      <QuestionCard class="set__question-card"
        v-for="([question, answer]) in setShuffled" 
        :key="question" 
        :question="question" 
        :answer="answer"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">

.set
  display: flex
  flex-direction: column

  &__name
    font-weight: 700
    margin-bottom: 2rem
    
  &__question-cards
  display: flex
  flex-direction: column

  &__question-card
    margin-bottom: 2rem



</style>