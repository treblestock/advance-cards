<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


import SetAllWidget from '@/components/SetAllWidget.vue'
import SetWidget from '@/components/SetWidget.vue'

import { useStoreSets } from '@/stores/sets.js'
import { useStoreSetsAnswersStats } from '@/stores/setsAnswersStats.js'

const props = defineProps({

})


const sets = useStoreSets()
const setsAnswersStats = useStoreSetsAnswersStats()


const setsNames = computed(() => sets.setsNames)


</script>

<template>
  <div>
    <AppLink 
      :to="{
        name: 'set',
        params: {
          setName: 'all',
        },
      }">
      <SetAllWidget></SetAllWidget>
    </AppLink>
    <AppLink 
      v-for="setName in setsNames"
      :to="{
        name: 'set',
        params: {
          setName,
        },
      }">
      <SetWidget :setName="setName"></SetWidget>
    </AppLink>
  </div>
</template>

<style scoped lang="pcss">
@import '@/assets/css/_vars';


</style>