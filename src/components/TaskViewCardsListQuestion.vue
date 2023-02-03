<script setup>
import {ref, computed, watch} from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'


const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: false,
  },
})





</script>

<template>
  <div class="set-card">
    <div class="set-card__question">
      {{ question }}
    </div>
    <div class="set-card__answer">
      {{ answer }}
    </div>
  </div>
</template>

<style lang="pcss" scoped>
@import '@/assets/css/_vars';
.set-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem; 

  &__question {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: .6rem;
  }

  &__answer {
    font-size: 1.5rem;
    color: $grey-dark;
  }
}




</style>