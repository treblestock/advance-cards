<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


import SetStats from '@/components/SetStats.vue'
import SetTask from '@/components/SetTask.vue'


const props = defineProps({
  setName: {
    type: String,
    required: true,
  },
})


</script>

<template>
  <div class="set">
    <SetStats class="set__stats"></SetStats>
    <SetTask class="set__task"
      :setName="setName"
    ></SetTask>
  </div>
</template>

<style scoped lang="pcss">
@import '@/assets/css/_vars';


</style>