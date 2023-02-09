<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


import { useStoreTask } from '@/stores/task.js'

const props = defineProps({
  
})

const task = useStoreTask()
const prevTaskRawStats = task.stats
console.log(prevTaskRawStats)



</script>

<template>
  <div class="task-report">
    task report
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";


</style>