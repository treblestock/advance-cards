<script setup>
import { ref, computed, watch  } from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted  } from 'vue'




</script>

<template>
  <div class="app">
    <RouterView></RouterView>
  </div>  
</template>

<style lang="pcss">
@import '@/assets/css/_null';

html,
body {
  font-size: 10px;
}



body {
  font-size: 2rem;
}

.container {
  max-width: 100rem;
  margin: 0 auto;
  padding: 2rem;
}
</style>

<style scoped lang="pcss">
@import '@/assets/css/_vars';


</style>