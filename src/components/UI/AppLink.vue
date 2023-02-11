<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import {ref, computed} from 'vue'
import { RouterLink } from 'vue-router'

import { modifyRouteTo } from '@/router/helpers'

const props = defineProps({
  ...RouterLink.props,
})

const isExternalLink = computed(() => 
  typeof props.to === 'string' && props.to.startsWith('http')
)


</script>

<template>
  <a class="link" target="_blank"
    v-if="isExternalLink" 
    :href="to" 
    :="$attrs" 
  >
    <slot />
  </a>
  <RouterLink class="link"
    v-else
    :="$attrs"
    :to="modifyRouteTo(to)"
    v-slot="slotProps"
  >
    <slot class="link__inner"
      v-bind="slotProps"
    />
  </RouterLink>
</template>

<style scoped lang="pcss">

.link {
  &__inner {
    user-select: none;
  }
}


</style>