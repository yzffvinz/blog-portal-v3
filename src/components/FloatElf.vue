<script setup lang="ts">
const emit = defineEmits(['elfClick'])
</script>

<template>
  <div
    class="float-elf__wrapper fixed flex items-center justify-center opacity-10 text-base right-5 w-5 h-5 bg-white border-2 border-solid border-black"
    @click.stop="$emit('elfClick')"
  >
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped></style>
