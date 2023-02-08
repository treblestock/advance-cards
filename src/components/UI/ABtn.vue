<script setup>

</script>

<template>
  <AppLink class="btn">
    <slot></slot>
  </AppLink>  
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";

.btn {
  padding: 1rem 1.5rem;
  background-color: $primary;
}
</style>