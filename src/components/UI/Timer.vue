<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'



const props = defineProps({
  timeStart: {
    type: [String, Number, Date],
    default: Date.now()
  }
})


let timerId
let timePassed = ref(0)
const minsPassed = computed(() => Math.floor(timePassed.value / 60))
const secsPassed = computed(() => {
  const secs = Math.floor(timePassed.value % 60) 
  return secs < 10 ? '0' + secs : secs
})
const TIMER_STEP = 1000



const isTimeGoing = ref(null)
function timeStart() {
  isTimeGoing.value = true
  timerId = setInterval( () => timePassed.value += 1, TIMER_STEP)
}
function timeStop() {
  isTimeGoing.value = false
  clearInterval(timerId)
}
function toggleTime() {
  isTimeGoing.value ? timeStop() : timeStart()
}
onMounted(() => timeStart() )
onBeforeUnmount(() => timeStop() )


</script>

<template>
  <div class="timer" @click="toggleTime">
    {{ minsPassed }}:{{ secsPassed }}
  </div>
</template>

<style scoped lang="sass">



</style>