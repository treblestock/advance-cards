<script setup>
import { ref, computed, watch  } from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted  } from 'vue'


import Set from '@/components/Set.vue'

import { useStoreSets } from '@/stores/Sets.js'
const storeSets = useStoreSets()


const sets = computed(() => storeSets.sets)

onMounted(() => {
  storeSets.loadSet('nlc')
})

</script>

<template>
  <div class="app">
    <div class="sets">
      <Set class="sets_set"
        v-for="(set, setName) in sets" :key="setName" 
        :set="set"
        :setName="setName"
        
      />
    </div>
  </div>  
</template>

<style lang="sass">
// Preset
@import @/assets/css/_null
@import @/assets/css/_helpers

html,
body 
  font-size: 10px



body 
  font-size: 2rem


</style>

<style scoped lang="sass">
@import @/assets/css/_helpers
@import @/assets/css/_vars


.sets
  display: flex
  flex-direction: column
  &__set
    margin-bottom: 3rem


</style>