<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import StatsRow from '@/components/StatsRow.vue'

import { toTimeInSec } from '@/assets/helpers'

import { useStoreTask } from '@/stores/task.js'

const props = defineProps({
  
})

const task = useStoreTask()
const taskStats = computed(() => {
  const rawStats = task.stats
  const set = task.setName
  const cardsRevised = task.cardsCount
  const accurance = (cardsRevised / rawStats.size).toFixed(4) * 100 + '%'
  const _time = task.timeFinish - task.timeStart 
  const time = toTimeInSec(_time)
  const timePerCard = toTimeInSec(_time / cardsRevised)


  return {
    set,
    cardsRevised,
    accurance,
    time,
    timePerCard
  }
})



</script>

<template>
  <div class="task-report">
    <div class="task-report__stats">
      <StatsRow class="task-report__stats-row"
        v-for="statValue, statName in taskStats" :key="statName"
        :statName="statName"
        :statValue="statValue"
      ></StatsRow>
    </div>
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";

.task-report {
  padding: 1rem;
  &__stats {
    margin-bottom: 1px;
  }

  &__stats-row {
  }

  &__btn {
  }
}

</style>