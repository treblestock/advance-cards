<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

const props = defineProps({
  src: String,
  absolute: Boolean,
})


const src = computed(() => props.src ? props.src : '/img/test.jpg')


</script>

<template>
  <img :src="src" alt="">  
</template>

<style scoped lang="sass">
@import @/assets/css/_vars
@import @/assets/css/_helpers

</style>