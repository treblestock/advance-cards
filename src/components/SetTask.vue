<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


const props = defineProps({
  setName: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <div class="set-task">
    <div class="set-task__task-view-toolbar task-view-toolbar">
      <ABtn class="task-view-toolbar__btn"
        :to="{
          name: 'taskViewSingleCard',
          patams: {
            setName,
          },
        }"
      >single</ABtn>
      <div></div>
    </div>
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";

.set-task {
  padding: 1rem;
  &__task-view-toolbar {
  }
}
.task-view-toolbar {
  display: flex;
  gap: 1rem;

  &__btn {
  }
}

</style>