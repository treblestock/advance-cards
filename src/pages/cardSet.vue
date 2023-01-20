<script setup>
import { ref, computed, onMounted } from 'vue'

import QuestionCard from '@/components/QuestionCard.vue'

const props = defineProps({
  cardSetName: {
    type: String,
    required: true,
  }
})


import { useStoreCardSets } from '@/stores/CardSets.js'
const storeCardSets = useStoreCardSets()


onMounted(() => {
  storeCardSets.currentCardSetName = props.cardSetName
})


const questionsData = computed(() => 
  storeCardSets.currentCardSetQuestions && Object.entries(storeCardSets.currentCardSetQuestions)
)
const answered = ref(new Set() )
const currentQuestion = computed(() => {
  if (!questionsData.value) return null
  while (answered.value.size < questionsData.value.length) {
    return questionsData.value.find( (questionData) => 
      !answered.value.has(questionData[0])
    )
  }
  return null
})


function onQuestionAnswered (question) {
  answered.value.add(question)
}

</script>

<template>
  <div>
    <QuestionCard
      v-if="currentQuestion"
      :question="currentQuestion[0]"
      :answer="currentQuestion[1]"
      @question-answered="onQuestionAnswered"
    ></QuestionCard>
  </div>  
</template>

<style scoped>



</style>