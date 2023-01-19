<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'


import SetsSearch from '@/components/SetsSearch.vue'
import SetUI from '@/components/SetUI.vue'





const setMock = {
  id: 'nlc',
  name: 'nlc',
  QAs: [
    {
      q: '00',
      a: 'ананас'
    },
    {
      q: '01',
      a: 'нокиа'
    },
  ],
}




const props = defineProps({
  
})

const searchQuery = ref('')
const sets = ref([setMock])


const setsFiltered = computed(() =>
  sets.value.filter(
    set => set.name.includes(searchQuery.value)
  )
)


</script>

<template>
  <div>
    <SetsSearch class="sets-toolbar__search" 
      v-model="searchQuery"
    />
    <div class="sets-toolbar__sets">
      <SetUI v-for="set in setsFiltered" :key="set.id" :set="set"/>
    </div>
  </div>
</template>

<style scoped lang="sass">

.sets-toolbar
  display: flex
  flex-direction: column

  &__search
    margin: 0 auto 2rem

  &__sets







</style>