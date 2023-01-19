<script setup>
import { ref, computed, watch  } from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted  } from 'vue'

import DefaultLayout from '@/components/sections/DefaultLayout.vue'




</script>

<template>
  <div class="app">
    <DefaultLayout />
  </div>  
</template>

<style lang="sass">
// Preset
@import @/assets/css/_null
@import @/assets/css/_helpers

html,
body 
  font-size: 10px



body 
  font-size: 2rem



.btn 
  padding: 0.8rem !important
  background: turquoise
  &:hover 
    background: darken(turquoise, 10%)
  
  &:active 
    background: red
  

</style>

<style scoped lang="sass">
@import @/assets/css/_helpers
@import @/assets/css/_vars


</style>