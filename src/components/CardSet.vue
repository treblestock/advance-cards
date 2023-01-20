<script setup>
import { ref, computed, inject } from 'vue'


const props = defineProps({
  cardSetName: {
    type: String,
    required: true,
  }
})


</script>

<template>
  <div class="set">
    <div class="set__name"
      @click="isOpenSet = !isOpenSet"
    >
      {{ cardSetName }}
    </div>
  </div>
</template>

<style scoped lang="sass">

.set
  display: flex
  flex-direction: column

  &__name
    font-weight: 700
    margin-bottom: 2rem

    cursor: pointer
    
  &__question-cards
  display: flex
  flex-direction: column

  &__question-card
    margin-bottom: 2rem



</style>