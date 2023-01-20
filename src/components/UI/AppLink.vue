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


const getElementClass = (classList) =>
  classList ? classList.split(' ').filter(cls => cls.includes('__') ).join(' ') : ''
const getBlockClass = (classList) =>
  classList ? classList.split(' ').filter(cls => !cls.includes('__') ).join(' ') : ''

const isExternalLink = computed(() => 
  typeof props.to === 'string' && props.to.startsWith('http')
)
const toStringifiedParams = computed(() => ({
  ...props.to,
  params: Object.entries(props?.to?.params || {}).reduce((props, [key, value]) =>
    (value !== undefined || value !== null) 
      ? (props[key] = JSON.stringify(value), props) : props
  , {})
}))


function propsParser(route) {
  return Object.entries(route.params).reduce((props, [key, value]) =>
     // required to ignore params auto fitted by router,
     // which were not provided by developer passing params: {}
     value  ? (props[key] = JSON.parse(value), props) : props 
  , {})
}

</script>

<!--!
  Problem of class passing from Parent
  span is required to recieve classes from Parent.vue,
  because scoped styles of Parent.vue affect only on the root tag of Child.vue.
  So, having several root components i should pass $attrs to the root tag,
  which will render (i guess it is RouterLink). I tried to pass
  class on every tag (RouterLink, a, slot), but i doesn't work:
  - ':="$attrs"' (inseated of $props on RouterLink)
  - ':class="$attrs.class"'

  I've found 2 solutions: 
  1) Use '::v-deep' selector in the parent 
    // allows Parent.vue styles to affect all the nested tags,
    // no matter which component it belongs to
    &::v-deep &__link 
  2) Use neutral root element wrapper such as span for inline tags


  The '1)' requires each time, using AppLink.block__element to style layout, 
    provide css selector with ::v-deep, exactly for this type components,
    moreover remember of this specialty in vue and the structure of the component you use.
    It is annoing and boilerpalte enough to use
  The '2)' Seems good :)
 -->
<template>
  <span 
    :class="getElementClass($attrs.class)"
  >
  <!-- <span :class="$attrs.class">  -->
    <a v-if="isExternalLink" :="$attrs" :href="to" target="_blank">
      <slot />
    </a>
    <RouterLink
      v-else
      :="$props"
      :to="toStringifiedParams"
      :class="getBlockClass($attrs?.class)"
      
      custom
      v-slot="{ isActive, href, navigate }"
    >
      <a
        @click="navigate"
        :href="href"
        :="$attrs"
        :class="getBlockClass($attrs.class)"
      >
        <slot />
      </a>
    </RouterLink>
  </span>
</template>

<style scoped lang="sass">
@import @/assets/css/_vars
@import @/assets/css/_helpers



</style>