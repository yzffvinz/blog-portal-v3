<script setup lang="ts">
const emit = defineEmits(['elfClick'])
</script>

<template>
  <div class="float-elf__wrapper" @click.stop="$emit('elfClick')">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
.float-elf__wrapper
  position fixed
  display flex
  align-items center
  justify-content center
  opacity 0.1
  font-size 15px
  right 20px
  top 10%
  width 20px
  height 20px
  border-radius 20px
  background #fff
  border 1px solid
</style>
