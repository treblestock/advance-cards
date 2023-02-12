<script setup>
import {ref, computed, watch} from 'vue'

import IconUpload from '@/components/icons/upload.vue'

const props = defineProps({

})

const emit = defineEmits([
  "create",
])


const newSetName = ref('')

function onClick() {
  if (!newSetName.value) {
    alert('write a set name')
    return
  }
  emit('create', newSetName.value)
  newSetName.value = ''
}
// function onUpload(event) {
//   if (!newSetName) alert('write a set name')
//   else $emit('create', newSetName)
// }

</script>

<template>
  <div class="set-toolbar">
    <input class="set-toolbar__store-name"
      v-model="newSetName"
    >
    <div class="set-toolbar__btns">
      <Btn class="set-toolbar__updalod set-toolbar__btn"
        @click="onClick"
      >
        <IconUpload class="set-toolbar__btn-icon"></IconUpload>
      </Btn>
    </div>

  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";
.set-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__store-name {
    border: 1px solid $grey;
  }
  &__btns {

  }

  &__btn {
    margin-left: 2rem;
    &._danger {
      background-color: red;
    }
  }
  &__btn-icon {
    width: 2rem;
    height: 2rem;
  }
  &__delete {
  }
  &__updalod {
  }
  &__download {
  }
}


</style>