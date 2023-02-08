<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


const props = defineProps({
  
})
const emit = defineEmits([
  'upload',
])

const fileName = ref(null)
const fileData = ref(null)

watch(
  fileName,
  console.log
)

function onUpload(event) {
  const input = event.target
  const file = input.files[0]
  fileName.value = file.name
  const reader = new FileReader()

  reader.readAsText(file)
  reader.onload = () => {
    const result = reader.result
    fileData.value = result
    console.log(result)
  }
  reader.onerror = () => {
    console.log(reader.error)
  }
}

function onSubmit() {
  console.log(fileData)
  emit('upload', fileData)
}

</script>

<template>
  <form class="store-import-form"
    @submit.prevent="() => $emit('upload', 'clicked')"
  >
    <input class="store-import-form__input _hidden" type="file" 
      ref="uploadInput"
      @change="onUpload"
    >
    <Btn class="store-import-form__btn"
      @click="() => $refs.uploadInput.click()"
    >
      <!-- {{ fileName || 'upload file' }} -->
      upload file
    </Btn>
    <Btn class="store-import-form__btn"
      @click="fileData = fileName = null"
    >reset</Btn>
    <button class="store-import-form__btn" 
      type="submit"
    >submit</button>
  </form>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";

.store-import-form {
  background-color: #fff;
  border-radius: .3rem;
  padding: 1rem;
  padding-right: 4rem;

  display: flex;
  gap: 1rem;

  &__btn {
    display: block;
  }
}


._hidden {
  visibility: hidden;
  width: 0;
  height: 0;
}
</style>