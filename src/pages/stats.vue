<script setup>
import {ref, computed, watch} from 'vue'

import { toHumanCase } from '@/assets/helpers'

import useRouteChildren from '@/composables/useRouteChildren.js'

const props = defineProps({
  
})


const statsPages = computed(
  () => useRouteChildren('stats').map(option => option.path) 
)



</script>

<template>
  <div class="stats">
    <div class="stats__nav stats-nav">
      <NavTabs class="stats-nav__section">
        <AppLink class="stats-nav__link"
          v-for="page in statsPages" :key="page"
          :to="`/stats/${page}`"
        >
          {{ toHumanCase(page) }}
        </AppLink>
      </NavTabs>
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
  border-bottom: 1px solid $grey;

  &__section {

  }

  &__link {
  }
}

</style>