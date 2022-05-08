<template>
  <svg class="cicon" aria-hidden="true">
    <use :xlink:href="icon"></use>
  </svg>
</template>

<script setup lang="ts">
type Props = {
  icon: string
}
defineProps<Props>()
</script>

<style scoped>

</style>