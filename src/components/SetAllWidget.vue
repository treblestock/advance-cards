<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


import useGetCountToReviseToday from '@/composables/useGetCountToReviseToday.js'


import { useStoreSets } from '@/stores/sets.js'
import { useStoreSetsRevisions } from '@/stores/setsRevisions.js'

const sets = useStoreSets()
const setsRevisions = useStoreSetsRevisions()

const props = defineProps({

})


const countToReviseToday = computed(() => 
  Object.keys(sets.sets).reduce((toRevise, setName) => {
    return toRevise += useGetCountToReviseToday(sets.sets[setName], setsRevisions.sets[setName])
  }, 0)
)



</script>

<template>
  <div class="set-widget">
    <div class="set-widget__name">
      all cards for today
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