<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import useGlobalProp from '@/composables/useGlobalProp.js'


const props = defineProps({
  
})


const pinia = useGlobalProp('$pinia')
const stores = computed(() => pinia._s)



</script>

<template>
  <div>
    <div
      v-for="[key, value] in stores" :key="value"
    >
      {{ key }}
    </div>
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";




</style>