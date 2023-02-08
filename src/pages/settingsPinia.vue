<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import useGlobalProp from '@/composables/useGlobalProp.js'

import PiniaStoreToolbar from '@/components/PiniaStoreToolbar.vue'

import { useStoreStats } from '@/stores/stats.js'
import { useStoreSets } from '@/stores/sets.js'
import { useStoreAppConfig } from '@/stores/appConfig.js'
const stats = useStoreStats()
const sets = useStoreSets()
const appConfig = useStoreAppConfig()

const props = defineProps({
  
})


const pinia = useGlobalProp('$pinia')
const stores = computed(() => pinia._s)



</script>

<template>
  <div>
    <div
      v-for="[storeId] in stores" :key="storeId"
    >
      <PiniaStoreToolbar :storeId="storeId"/>
    </div>
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";




</style>