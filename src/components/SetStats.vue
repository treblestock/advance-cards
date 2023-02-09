<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import StatsRow from '@/components/StatsRow.vue'


const props = defineProps({
  
})

</script>

<template>
  <div class="set-stats">
    stats
    <!-- <StatsRow class="set-stats__row"
      
    ></StatsRow> -->
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";


</style>