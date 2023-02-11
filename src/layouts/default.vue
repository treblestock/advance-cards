<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'



const props = defineProps({
  
})

const PAGES_NAMES = ['sets', 'stats', 'settings']

</script>

<template>
  <div class="layout">
    <main class="layout__main">
      <RouterView></RouterView>
    </main>
    <footer class="layout__footer">
      <NavTabs class="layout__nav top-level-nav">
        <AppLink class="top-level-nav__link"
          v-for="pageName in PAGES_NAMES" :key="pageName"
          :to="{ name: pageName }"
        >
          {{ pageName }}
        </AppLink>
      </NavTabs>
    </footer>
  </div>
</template>

<style lang="pcss" scoped>
@import '@/assets/css/_vars';

.layout {
  height: 1px;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  &__main {
    flex: 1 1 auto;
    padding: 0.5rem;
  }
  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    
    background-color: #fff;
    z-index: 1;


    flex: 0 1 5rem;

    border-top: 1px solid $grey;
  }
  &__nav {
  }
}



</style>