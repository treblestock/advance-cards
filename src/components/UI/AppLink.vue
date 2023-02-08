<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { RouterLink } from 'vue-router'

const props = defineProps({
  ...RouterLink.props,
  inactiveClass: String,
})


const isExternalLink = computed(() => 
  typeof props.to === 'string' && props.to.startsWith('http')
)
const toStringifiedParams = computed(() => {
  return typeof props.to === 'string' 
    ? props.to
    : ({
    ...props.to,
    params: Object.entries(props?.to?.params || {}).reduce((props, [key, value]) =>
      (value !== undefined || value !== null) 
        ? (props[key] = JSON.stringify(value), props) : props
    , {})
  })  
})

function propsParser(route) {
  return Object.entries(route.params).reduce((props, [key, value]) =>
     // required to ignore params auto fitted by router,
     // which were not provided by developer passing params: {}
     value  ? (props[key] = JSON.parse(value), props) : props 
  , {})
}

function onClick(p) {
  console.log(p)
}
</script>

<template>
  <a v-if="isExternalLink" :="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <RouterLink
    v-else
    :="$attrs"
    :to="toStringifiedParams"
    v-slot="slotProps"
  >
    <slot 
      v-bind="slotProps"
    />
  </RouterLink>
</template>

<style scoped >



</style>