<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import useGetCountToReviseToday from '@/composables/useGetCountToReviseToday.js'

import { useStoreSets } from '@/stores/sets.js'
import { useStoreSetsAnswersStats } from '@/stores/setsAnswersStats.js'

const sets = useStoreSets()
const setsAnswersStats = useStoreSetsAnswersStats()

const props = defineProps({
  setName: {
    type: String,
    required: true,
  },
})

const countToReviseToday = computed(() => 
  useGetCountToReviseToday(sets.sets[props.setName], setsAnswersStats.sets[props.setName])
)




</script>

<template>
  <div class="set-widget">
    <div class="set-widget__name">
      {{ setName }}
    </div>
    <div class="set-widget__cards">
      to revise today: {{ countToReviseToday }}
    </div>
  </div>
</template>

<style lang="pcss" scoped>
@import '@/assets/css/_vars';
.set-widget {
  padding: 1rem 2rem; 

  &__name {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: .6rem;
  }

  &__cards {
    font-size: 1.5rem;
    color: $grey-dark;
  }
}




</style>