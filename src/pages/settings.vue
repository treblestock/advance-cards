<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter, useRoute } from 'vue-router'

import { toHumanCase } from '@/assets/helpers'
import useRouteChildren from '@/composables/useRouteChildren.js'

const props = defineProps({
  
})
const router = useRouter()

const SETTINGS_ROOT_PAGE_NAME = 'settings'
const settingsChildrenPathes = ref(useRouteChildren(SETTINGS_ROOT_PAGE_NAME).map(option => option.path) )
const isSettingsRootPage = computed(() => useRoute().name === SETTINGS_ROOT_PAGE_NAME)

const chosenPath = computed(() => {
  const pathParts = useRoute().path.split('/')
  return pathParts[pathParts.length - 1]
})

const settingsPages = computed(() => {
  return chosenPath.value === 'settings'
    ? settingsChildrenPathes.value
    : [chosenPath.value]
})




// spoiler effect
function onClick(path) {
  if (chosenPath.value === path) {
    router.push({name: 'settings'})
  }
}




</script>

<template>
  <div class="settings">
    <div class="settings__nav">
      <TransitionGroup name="wrap">
        <AppLink class="settings__nav-link spoiler"
          v-for="path in settingsPages" :key="path"
          :to="`/settings/${path}`"
          v-slot="slotProps"
          @click="() => onClick(path)"
        > 
          <!-- * this wrapper allows to recive v-slot data from AppLink  -->
          <!-- <span 
            @click="() => slotProps.navigate()"
          >{{ path }}</span> -->


          {{ toHumanCase(path) }}
        </AppLink>
      </TransitionGroup>
    </div>
    <div class="settings__view">
      <RouterView v-slot="{ Component }">
        <Transition name="merge">
          <Component :is="Component"></Component>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style scoped lang="pcss">
@import '@/assets/css/_vars';
.settings {


  &__nav {

  }

  &__nav-link {
    
  }

  &__view {
    padding: 2rem;
  }
}


.spoiler {
  display: block;
  padding: 2rem;
  padding-left: 3rem;

  border-bottom: 1px solid $grey;

  position: relative;
  &:before,
  &:after {
    content: '';
    position: absolute;

    display: block;
    width: 1rem;
    height: .1rem;


    background-color: $grey;
  }
}


/* wrap */
.wrap-move,
.wrap-enter-active,
.wrap-leave-active {
  transition: all, .3s ease;
}
.wrap-leave-active {
  position: absolute;
}

.wrap-enter-from,
.wrap-leave-to {
  opacity: 0;
}
.wrap-enter-to,
.wrap-leave-from {
  
}
/*  */



.merge-move,
.merge-enter-active,
.merge-leave-active {
  transition: all ease-out .3s, opacity ease-in .6s;
}
.merge-leave-active {
  position: absolute;
  display: none;
}

.merge-enter-from,
.merge-leave-to {
  font-size: 0;
  padding: 0;
  margin: 0;
  opacity: 0;
}



</style>