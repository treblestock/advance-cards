<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import useRouteChildren from '@/composables/useRouteChildren.js'

import { useStoreStats } from '@/stores/stats.js'
const stats = useStoreStats()

const props = defineProps({
  
})


const statsPages = computed(
  () => useRouteChildren('stats').map(option => option.path) 
)



</script>

<template>
  <div class="stats">
    <div class="stats__nav stats-nav">
      <div class="stats-nav__section"
        v-for="page in statsPages" :key="page"
      >
        <AppLink class="stats-nav__link"
          :to="`/stats/${page}`"
        >{{ page }}</AppLink>
      </div>
    </div>
    <div class="stats__page">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="pcss">
@import '@/assets/css/_vars';

.stats {
  height: 100%;
  &__nav {
  }

  &__page {
    /* padding: 1rem 1.5rem; */
    padding: $nav-padding;
  }
}
.stats-nav {
  display: flex;

  padding: 1rem 1.5rem;
  border-bottom: 1px solid $grey;

  &__section {
    flex: 0 0 calc(100% / 3);
    text-align: center;

    & + & {
      border-left: 1px solid $grey;
    }
  }

  &__link {
  }
}

</style>