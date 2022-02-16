<script setup lang="ts">
const emit = defineEmits(['elfClick'])
</script>

<template>
  <div class="float-elf__wrapper" @click.stop="$emit('elfClick')">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped></style>
