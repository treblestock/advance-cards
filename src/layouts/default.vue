<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import Nav from '@/components/Nav.vue'


const props = defineProps({
  
})

</script>

<template>
  <div class="layout">
    <main class="main">
      <RouterView></RouterView>
    </main>
    <footer class="footer">
      <Nav class="nav"></Nav>
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
}
.main {
  flex: 1 1 auto;
  padding: 0.5rem;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  
  background-color: #fff;
  z-index: 1;


  flex: 0 1 5rem;

  border-top: 1px solid $grey;
}
.nav {
}



</style>