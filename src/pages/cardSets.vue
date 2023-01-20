<script setup>
import { ref, computed, onMounted } from 'vue'

import CardSet from '@/components/CardSet.vue'


import { useStoreCardSets } from '@/stores/CardSets.js'
const storeCardSets = useStoreCardSets()

onMounted(() => {
  storeCardSets.loadSet('nlc')
})

const cardSetsNames = computed(() => storeCardSets.setsNames)
</script>

<template>
  <div>
    <AppLink
      v-for="cardSetName in cardSetsNames" :key="cardSetName"
      :to="{
        name: 'cardSet',
        params: {
          cardSetName,
        }
      }"
    >
      <CardSet
        :cardSetName="cardSetName"
      />
    </AppLink>
  </div>  
</template>

<style scoped>



</style>