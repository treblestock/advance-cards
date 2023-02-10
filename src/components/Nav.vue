<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


const props = defineProps({
  
})

</script>

<template>
  <nav class="nav">
    <AppLink class="nav__link"
      :to="{
        name: 'sets',
      }"
    >sets</AppLink>
    <AppLink class="nav__link"
      :to="{
        name: 'stats',
      }"
    >stats</AppLink>
    <AppLink class="nav__link"
      :to="{
        name: 'settings',
      }"
    >settings</AppLink>
  </nav>
</template>

<style lang="pcss" scoped>
@import '@/assets/css/_vars';

.nav {
  padding: $nav-padding;
  display: flex;
  height: 100%;

  &__link {
    flex: 0 0 33.33%;

    display: grid;
    place-content: center;
    height: 100%;
    width: 100%;

    & + & {
      border-left: 1px solid $grey;
    }
  }
}


</style>