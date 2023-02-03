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
  isShownAnswer: {
    type: Boolean,
    required: false,
    default: false,
  },
})





</script>

<template>
  <div class="set-card">
    <div class="set-card__question">
      {{ question }}
    </div>
    <div class="set-card__answer"
      :class="{_hidden: !isShownAnswer}"
    >
      {{ answer }}
    </div>
  </div>
</template>

<style lang="pcss" scoped>
@import '@/assets/css/_vars';
.set-card {
  padding: 1rem 2rem; 
  text-align: center;

  &__question {
    font-weight: 700;
    font-size: 2rem;
    padding: 1rem;

  }

  &__answer {
    font-size: 1.5rem;
    color: $grey-dark;
    padding: 1rem;

    border-top: 1px solid $grey;
    
    transition: all .2s linear;

    &._hidden {
      border: none;
      opacity: 0;
    }
  }
}




</style>