<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import useGlobalProp from '@/composables/useGlobalProp.js'

import PiniaStoreToolbar from '@/components/PiniaStoreToolbar.vue'

import { useStoreStats } from '@/stores/stats.js'
import { useStoreSetsCards } from '@/stores/setsCards.js'
import { useStoreAppConfig } from '@/stores/appConfig.js'
const stats = useStoreStats()
const setsCards = useStoreSetsCards()
const appConfig = useStoreAppConfig()

const props = defineProps({
  
})


const pinia = useGlobalProp('$pinia')
const stores = computed(() => pinia._s)



</script>

<template>
  <div class="pinia">
    <PiniaStoreToolbar class="pinia__toolbar"
      v-for="[storeId] in stores" :key="storeId"
      :storeId="storeId"
    />
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";


.pinia {

  &__toolbar {
    margin-bottom: 1rem;
  }
}


</style>