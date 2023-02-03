<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import TaskViewCardsListQuestion from '@/components/TaskViewCardsListQuestion.vue'

import { useStoreSets } from '@/stores/sets.js'

const props = defineProps({
  setName: {
    type: String,
    required: true,
  },
})


const sets = useStoreSets()


const setsNames = computed(() => sets.setsNames)
const cardQuestionData = computed(() => sets.sets[props.setName])

</script>

<template>
  <div>
    <TaskViewCardsListQuestion
      v-for="(answer, question) in cardQuestionData"
      :question="question"
      :answer="answer"
    ></TaskViewCardsListQuestion>
  </div>
</template>

<style scoped lang="pcss">
@import '@/assets/css/_vars';


</style>