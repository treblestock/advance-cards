<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


const props = defineProps({
  
})



</script>

<template>
  <nav class="nav">
    <slot></slot>
  </nav>
</template>

<style lang="pcss" scoped>
@import '@/assets/css/_vars';

.nav {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));

  :slotted(& > *) {

    display: grid;
    place-content: center;

    padding: $nav-padding;
    border-left: 1px solid $grey;
    &:first-child {
      border: none;
    }
  }
}


</style>