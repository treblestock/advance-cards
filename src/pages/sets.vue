<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


import SetWidget from '@/components/SetWidget.vue'

import { useStoreSets } from '@/stores/sets.js'
import { useStoreSetsRevisions } from '@/stores/setsRevisions.js'

const props = defineProps({

})


const sets = useStoreSets()
const setsRevisions = useStoreSetsRevisions()


const setsNames = computed(() => sets.setsList)


</script>

<template>
  <div class="sets-page">
    <div class="sets-page__sets-list">
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
    <div class="sets-page__new-set">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="pcss">
@import '@/assets/css/_vars';

.sets-page {

  &__sets-list {
    margin-bottom: 1rem;
  }

  &__new-set {
  }
}

</style>