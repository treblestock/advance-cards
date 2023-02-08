<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


import StatsRow from '@/components/StatsRow.vue'

import { useStoreStats } from '@/stores/stats.js'
const stats = useStoreStats()

const props = defineProps({
  
})


const statsData = computed(() => stats.prevTask)

</script>

<template>
  <div class="stats-rows">
    <StatsRow class="stats-row"
      v-for="statValue, statName in statsData" :key="statName" 
      :statName="statName"
      :statValue="statValue"
    ></StatsRow>
  </div>
</template>

<style scoped>



</style>