<script setup>
import SetUpdateCreateForm from '@/components/SetUpdateCreateForm.vue'

const props = defineProps({
  setName: {
    type: String,
    required: false,
  }
})

</script>

<template>
  <div class="new-set-form">
    <SetUpdateCreateForm class="new-set-form"
      :setName="setName"
      :key="setName"
    ></SetUpdateCreateForm>
  </div>
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";


</style>