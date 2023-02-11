<script setup>
import NewSetUploadForm from '@/components/NewSetUploadForm.vue'

import useUpload from '@/composables/useUpload.js'

import { useStoreSets } from '@/stores/sets.js'
const sets = useStoreSets()

const props = defineProps({
  setName: {
    type: String,
    required: false,
  }
})





</script>

<template>
  <div class="new-set-upload-form">
    <NewSetUploadForm 
      @create="(setName) => useUpload({onload: (file) => sets.importSet(setName, file.data)} )"
    ></NewSetUploadForm>
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";




</style>