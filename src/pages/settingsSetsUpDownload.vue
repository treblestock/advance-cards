<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import SettingsSetToolbar from '@/components/SettingsSetToolbar.vue'
import NewSetUploadForm from '@/components/NewSetUploadForm.vue'

import useDownload from '@/composables/useDownload.js'
import useUpload from '@/composables/useUpload.js'

import { useStoreSets } from '@/stores/sets.js'
const sets = useStoreSets()

const props = defineProps({
  
})





</script>

<template>
  <div class="sets">
    <SettingsSetToolbar class="sets__set-toolbar"
      v-for="_, setName in sets.sets" :key="setName"
      :setName="setName"
      @download="() => useDownload(setName, sets.exportSet(setName))"
      @update="() => useUpload({onload: (file) => sets.importSet(setName, file.data)} )"
      @delete="() => sets.deleteSet(setName)"
    ></SettingsSetToolbar>
    <NewSetUploadForm 
      @create="(setName) => useUpload({onload: (file) => sets.importSet(setName, file.data)} )"
    ></NewSetUploadForm>
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";


.sets {

  &__set-toolbar {
    margin-bottom: 1rem;
  }
}


</style>