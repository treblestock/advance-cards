<script setup>
import {ref, computed, watch } from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import { getCurrentInstance } from 'vue'


import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import useRenderComponent from '@/composables/useRenderComponent.js'
import useDebounce from '@/composables/useDebounce.js'

import { DoublyLinkedList } from '@/assets/helpers'

const props = defineProps({
  poolCount: {
    type: Number,
    default: 5
  },
  itemsProps: {
    type: Array,
    required: true,
  },
  component: {
    required: true
  }
})

// VM data 
// initialization
const list = ref(new DoublyLinkedList() )

function initializeList() {
  for (let i = 0; i < props.poolCount; i++) {
    insertItem(i, 'push')
  }
}
onMounted(() => initializeList() )
onBeforeUpdate(() => {
  console.log('upadte')
//   getCurrentInstance()?.proxy?.$forceUpdate()
})


// api
function insertItem(i, pushOrUnshift = 'push') {
  if (!props.itemsProps[i]) return
  const appendOrPrepend = pushOrUnshift === 'push' ? 'append' : 'prepend'
  const unmountItem = renderItem(i, appendOrPrepend)
  list.value[pushOrUnshift]({
    props: props.itemsProps[i],
    ind: i,
    unmountItem,
  })
  return true
}
function removeItem(side) {
  const item = list.value[side]
  item.data.unmountItem()
  const shiftOrPop = side === 'first' ? 'shift' : 'pop'
  list.value[shiftOrPop]()
}

function slideDown(n) {
  const lastInd = list.value.last.data.ind
  const isInserted = insertItem(lastInd + 1)
  if (!isInserted) return
  removeItem('first')
  if (n) slideDown(n -1)
}
function slideUp(n) {
  const first = list.value.first.data.ind
  const isInserted = insertItem(first - 1, 'unshift')
  if (!isInserted) return
  removeItem('last')
  if (n) slideUp(n -1)
}




// view render
const { appContext } = getCurrentInstance()
const itemsHtml = ref()
const slotRef = ref()
function setSlotRef(el) {
  slotRef.value = el
}

function renderItem(ind, to = 'append') {
  const cloneProps = props.itemsProps[ind]
  const wrapper = document.createElement('div')
  itemsHtml.value[to](wrapper)
  const unmountItem = useRenderComponent({
    el: wrapper,
    component: props.component,
    props: cloneProps,
    appContext,
  })

  return () => {
    unmountItem()
    wrapper.remove()
  }
}


// view scroll
const DELAY = 200
const slideDownDebounced = useDebounce(slideDown, DELAY)
const slideUpDebounced = useDebounce(slideUp, DELAY)
function onscroll(event) {
  const target = event.target
  const isClosedToTop = target.scrollTop < 20
  const isClosedToBottom = target.scrollHeight - (target.scrollTop + target.offsetHeight) < 20
  
  if (isClosedToTop) {
    slideUpDebounced(5)
  }
  if (isClosedToBottom) {
    slideDownDebounced(5)
  }
  
}



</script>

<template>
  <div class="virtual-scroll"
    @scroll.prevent="onscroll"
  >
    <div class="virtual-scroll__items"
      ref="itemsHtml"
    >
      <slot
        :slotProps="itemsProps[0]"
        :setSlotRef="setSlotRef"
      ></slot>
    </div>
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";

.virtual-scroll {
  overflow: scroll;
  
  &__items {

  }
}

</style>