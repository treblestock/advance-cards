<script setup>
import {ref, computed, watch} from 'vue'


import useDownload from '@/composables/useDownload.js'
import useUpload from '@/composables/useUpload.js'
import useGetCountToReviseToday from '@/composables/useGetCountToReviseToday.js'
import SetToolbar from '@/components/SetToolbar.vue'

import { useStoreSetsCards } from '@/stores/setsCards.js'
import { useStoreSetsRevisions } from '@/stores/setsRevisions.js'

const setsCards = useStoreSetsCards()
const setsRevisions = useStoreSetsRevisions()

const props = defineProps({
  setName: {
    type: String,
    required: true,
  },
})

const countToReviseToday = computed(() => 
  useGetCountToReviseToday(setsCards.sets[props.setName], setsRevisions.sets[props.setName])
)


const isOpenedToolbar = ref(false)

</script>

<template>
  <AppLink 
    :to="{
      name: 'set',
      params: {
        setName,
      },
    }">
    <div class="set-widget">
      <div class="set-widget__row">
        <div class="set-widget__info set-info">
          <div class="set-info__name">
            {{ setName }}
          </div>
          <div class="set-info__cards">
            to revise today: {{ countToReviseToday }}
          </div>
        </div>

        <Btn class="set-toolbar-toggler set-info__toolbar-toggler"
          :class="{_active: isOpenedToolbar}"
          @click.prevent="() => isOpenedToolbar = !isOpenedToolbar"
        ></Btn>
      </div>
      <div class="set-widget__row"
        @click.prevent=""
      >
        <Transition name="slide-down">
          <SetToolbar class="set-widget__toolbar set-toolbar"
            v-show="isOpenedToolbar"
            @download="() => useDownload(setName, setsCards.exportSet(setName))"
            @update="() => useUpload({onload: (file) => setsCards.importSet(setName, file.data)} )"
            @edit="() => $navigate({name: 'newSetManualForm', params: {setName} })"
            @delete="() => setsCards.deleteSet(setName)"
          ></SetToolbar>
        </Transition>
      </div>
    </div>
  </AppLink>
</template>

<style lang="pcss" scoped>
@import '@/assets/css/_vars';
.set-widget {

  &__row {
    display: flex;
    justify-content: space-between;

    &:first-child {
      background: #fff;
    }
  }
  &__info {

  }
  &__toolbar {
  }
}
.set-info {
  padding: 1rem 2rem; 

  &__name {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: .6rem;
  }

  &__cards {
    font-size: 1.5rem;
    color: $grey-dark;
  }

  &__toolbar-toggler {
    align-self: center;
  }
}

.set-toolbar-toggler {
  display: grid;
  place-content: center;
  width: 4rem;
  height: 4rem;

  background: none !important;

  &:before {
    content: '\142F';  
  }

  &._active {
    transform: rotate(180deg)
  }
}
.set-toolbar {
  height: 4rem;
}


/* slide-down */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all .2s ease;
  z-index: -1;
}

.slide-down-enter-from,
.slide-down-leave-to {
  /* transform: translateY(-100%) scaleY(0); */

  height: 0;
  opacity: 0;
  
}
.slide-down-enter-to,
.slide-down-leave-from {
  
}




</style>