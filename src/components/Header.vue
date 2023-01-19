<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'



const props = defineProps({
  
})

</script>

<template>
  <div class="header">
    <slot></slot>
  </div>
</template>

<style scoped lang="sass">




</style>