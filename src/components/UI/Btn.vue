<script setup>

</script>

<template>
  <button class="btn" type="button">
    <slot></slot>
  </button>  
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";

.btn {
  padding: .5rem 1rem;
  background-color: $primary;

  border-radius: .3rem;
  &:hover,
  &:active {
    background-color: $primary;
  }
}
</style>