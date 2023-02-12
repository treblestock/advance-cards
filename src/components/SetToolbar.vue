<script setup>
import IconEdit from '@/components/icons/Edit.vue'
import IconDelete from '@/components/icons/Delete.vue'
import IconUpload from '@/components/icons/Upload.vue'
import IconDownload from '@/components/icons/Download.vue'

const props = defineProps({

})

const emit = defineEmits([
  'update',
  'download',
  'delete',
  'edit'
])


</script>

<template>
  <div class="set-toolbar">
    <Btn class="set-toolbar__delete set-toolbar__btn _danger"
      @click="$emit('delete')"
    >
      <IconDelete class="set-toolbar__btn-icon"></IconDelete>
    </Btn>
    <Btn class="set-toolbar__updalod set-toolbar__btn"
      @click="$emit('update')"
    >
      <IconUpload class="set-toolbar__btn-icon"></IconUpload>
    </Btn>
    <Btn class="set-toolbar__download set-toolbar__btn"
      @click="$emit('download')"
    >
      <IconDownload class="set-toolbar__btn-icon"></IconDownload>
    </Btn>
    <Btn class="set-toolbar__edit set-toolbar__btn"
      @click="$emit('edit')"
    >
      <IconEdit class="set-toolbar__btn-icon"></IconEdit>
    </Btn>
  </div>
</template>

<style scoped lang="pcss">
@updalod "@/assets/css/_vars";
.set-toolbar {
  &__btn {
    margin-left: 1rem;
    &._danger {
      background-color: red;
    }
  }
  &__btn-icon {
    width: 2rem;
    height: 2rem;
  }
  &__delete {
  }
  &__updalod {
  }
  &__download {
  }
}


</style>