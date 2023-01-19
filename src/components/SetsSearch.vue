<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'



const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  }
})




</script>

<template>
  <div class="wrapper">
    <input type="text" class="search" 
      :value="modelValue" 
      @input="(event) => $emit('update:modelValue', event.target.value)"
    >
  </div>
</template>

<style scoped lang="sass">
@import @/assets/css/_UI
.wrapper
  display: grid
  justify-content: center
.search
  +box



</style>