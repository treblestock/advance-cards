<script setup>
import NewSetUploadForm from '@/components/NewSetUploadForm.vue'

import useUpload from '@/composables/useUpload.js'

import { useStoreSetsCards } from '@/stores/setsCards.js'
const setsCards = useStoreSetsCards()

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
      @create="() => useUpload({onload: (filename, filedata) => setsCards.importSet(filename.split('.')[0], filedata)} )"
    ></NewSetUploadForm>
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";




</style>