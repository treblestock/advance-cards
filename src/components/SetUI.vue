<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'



const props = defineProps({
  set: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="set-ui">
    <div class="set-ui__actions">
      <button class="btn" type="button">Run</button>
      <button class="btn" type="button">Patch</button>
      <button class="btn" type="button">Delete</button>
    </div>
    <div class="set-ui__set-name">{{ set.name }}</div>
  </div>  
</template>

<style scoped lang="sass">
@import @/assets/css/_UI
.set-ui
  +box
  display: flex
  align-items: baseline 
  margin-bottom: 1rem
  gap: 1rem
  

  &__actions

  &__set-name




</style>