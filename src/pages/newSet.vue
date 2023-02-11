<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import { toHumanCase } from '@/assets/helpers'


import useRouteChildren from '@/composables/useRouteChildren.js'

const props = defineProps({
  
})


const newSetForms = computed(() => useRouteChildren('newSet', 'name') )

</script>

<template>
  <div class="new-set">
    <NavTabs class="new-set__nav-tabs">
      <AppLink
        v-for="newSetForm in newSetForms" :key="newSetForm" 
        :to="{name: newSetForm}"
      >
        {{ toHumanCase(newSetForm).includes('manual') ? 'manual' : 'upload' }}
      </AppLink>
    </NavTabs>
    <div class="new-set__form">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";
.new-set {

  &__nav-tabs {
    border-top: 1px solid $grey;
    border-bottom: 1px solid $grey;

    margin-bottom: 2rem;
  }

  &__form {
  }
}


</style>