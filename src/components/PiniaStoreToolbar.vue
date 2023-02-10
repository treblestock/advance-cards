<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import useGlobalProp from '@/composables/useGlobalProp.js'
import useUpload from '@/composables/useUpload.js'


const props = defineProps({
  storeId: {
    type: String,
    required: true,
  }
})

const pinia = useGlobalProp('$pinia')
const store = pinia._s.get(props.storeId)



function onData(data) {
  store.importState(data)
}
</script>

<template>
  <div class="pinia-store-toolbar">
    <div class="pinia-store-toolbar__store-name">{{ storeId }}</div>
    <div class="pinia-store-toolbar__btns">
      <Btn class="pinia-store-toolbar__upload pinia-store-toolbar__btn"
        @click="() => useUpload({onload: ({data}) => onData(data) })"
      >upload</Btn>
      <Btn class="pinia-store-toolbar__download pinia-store-toolbar__btn"
        @click="() => store.exportState()"
      >download</Btn>
    </div>

  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";
.pinia-store-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__store-name {

  }
  &__btns {
    display: flex;
    gap: 1rem;
  }

  &__btn {
  }
  &__download {
  }
  &__upload {
  }
}


</style>