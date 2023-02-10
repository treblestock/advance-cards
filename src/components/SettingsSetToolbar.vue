<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import IconDelete from '@/components/icons/delete.vue'
import IconUpload from '@/components/icons/upload.vue'
import IconDownload from '@/components/icons/download.vue'

const props = defineProps({
  setName: {
    type: String,
    required: true,
  }
})

const emit = defineEmits([
  'update',
  'donwload',
  'delete',
])


</script>

<template>
  <div class="set-toolbar">
    <div class="set-toolbar__store-name">{{ setName }}</div>
    <div class="set-toolbar__btns">
      <Btn class="set-toolbar__delete set-toolbar__btn _danger"
        @click="$emit('delete', setName)"
      >
        <IconDelete class="set-toolbar__btn-icon"></IconDelete>
      </Btn>
      <Btn class="set-toolbar__updalod set-toolbar__btn"
        @click="$emit('update', setName)"
      >
        <IconUpload class="set-toolbar__btn-icon"></IconUpload>
      </Btn>
      <Btn class="set-toolbar__download set-toolbar__btn"
        @click="$emit('download', setName)"
      >
        <IconDownload class="set-toolbar__btn-icon"></IconDownload>
      </Btn>
    </div>

  </div>
</template>

<style scoped lang="pcss">
@updalod "@/assets/css/_vars";
.set-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__store-name {

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
    width: 3rem;
    height: 3rem;
  }
  &__delete {
  }
  &__updalod {
  }
  &__download {
  }
}


</style>