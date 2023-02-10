<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import MyIcon from '@/assets/img/icons/_crud/delete.svg'

const props = defineProps({
  
})

</script>

<template>
  <MyIcon class="icon"></MyIcon>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";

.icon {
  /* --icon-width: $icon-size;
  --icon-height: $icon-size; */
  --icon-color: red;
}
</style>