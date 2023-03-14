<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'



import SetWidget from '@/components/SetWidget.vue'

import { useStoreSetsCards } from '@/stores/setsCards.js'
import { useStoreSetsRevisions } from '@/stores/setsRevisions.js'

const props = defineProps({

})


const setsCards = useStoreSetsCards()
const setsRevisions = useStoreSetsRevisions()


const setsNames = computed(() => setsCards.setsList)
// const setsNamesForVirtualScroll = computed(() => 
//   setsNames.value.map(setName => ({setName}) )
// )
// const updateKey = ref(0)
// onBeforeUpdate(() => {
//   console.log('updated...')
//   updateKey.value++
// })

</script>

<template>
  <div class="sets-page">
    <div class="sets-page__sets-list">
      <SetWidget
        v-for="setName in setsNames" :key="setName" 
        :setName="setName"
      ></SetWidget>
      <!-- <VirtualScroll class="sets-page__sets-scroll"
        :itemsProps="setsNamesForVirtualScroll" 
        :component="SetWidget"
        :poolCount="12"
        :key="updateKey"
      >
      </VirtualScroll> -->
        <!-- <template #default="{slotProps: {setName}, setSlotRef}" >
          <SetWidget 
            :ref="(el) => setSlotRef(el)"
            :setName="setName" 
          ></SetWidget>
        </template> -->
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
  &__sets-scroll {
    max-height: 60vh;
    width: 100%;
  }

  &__new-set {
  }
}

</style>