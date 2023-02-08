<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


const props = defineProps({
  statName: {
    type: String,
    required: true,
  },
  statValue: {
    type: [String, Number, null],
    required: true,
  },
})

</script>

<template>
  <div class="stats-row">
    <div class="stats-row__stat-name">{{ statName }}: </div>
    <div class="stats-row__stat-value">{{ statValue }}</div>
  </div>
</template>

<style scoped lang="pcss">
@import '@/assets/css/_vars';
.stats-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  &__stat-name {
    font-size: 1.8rem;
    font-weight: 700;
  }

  &__stat-value {
    font-size: 1.4rem;
  }
}


</style>