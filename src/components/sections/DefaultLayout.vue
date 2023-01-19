<script setup>
import { ref, computed, watch } from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'


import Header from '@/components/Header.vue'
import CardSetsToolbar from '@/components/CardSetsToolbar.vue'
import CurrentTaskCardSet from '@/components/CurrentTaskCardSet.vue'

// <!--* test -->
// const currentTaskCardSetName = ref(false)
// onMounted(() => {
//   setInterval(() => currentTaskCardSetName.value = !currentTaskCardSetName.value, 1000)
// })

</script>

<template>
  <div class="container">
    <Header
      class="header"
      :class="{_fullscreen: !currentTaskCardSetName}"
    >
      <CardSetsToolbar />
    </Header>
    
    <CurrentTaskCardSet class="main _fullscreen"
      v-if="currentTaskCardSetName"
      :cardSetName="currentTaskCardSetName"
    />
    
  </div>  
</template>

<style scoped lang="sass">
@import @/assets/css/_helpers
@import @/assets/css/_vars


.container
  
  height: 1px
  min-height: 100vh


.header
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 3rem

  transition: height .2s linear

  // background: turquoise // test
  
  & + *
    padding-top: 3rem

.main
  transition: height .2s linear
  // background: purple // test

._fullscreen
  height: 100vh

</style>  