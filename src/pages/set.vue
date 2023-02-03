<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


import { useStoreSets } from '@/stores/sets.js'

const props = defineProps({
  setName: {
    type: String,
    required: true,
  },
})




</script>

<template>
  <div class="">
    <AppLink
      :to="{
        name: 'taskViewSingleCard',
        patams: {
          setName,
        },
      }"
    >single</AppLink>
    <div></div>
    <AppLink
      :to="{
        name: 'taskViewCardsList',
        patams: {
          setName,
        },
      }"
    >list</AppLink>
  </div>
</template>

<style scoped lang="pcss">
@import '@/assets/css/_vars';


</style>