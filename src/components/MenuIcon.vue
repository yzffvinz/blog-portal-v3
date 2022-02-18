<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['menuClick'])
const props = defineProps<{
  initUnfoldStatus: boolean
}>()

const unfold = ref(false)

function toggleUnfold() {
  unfold.value = !unfold.value
  emit('menuClick', unfold.value)
}
</script>
<template>
  <div
    class="masthead__nav-icon absolute right-5 inline-block overflow-hidden w-6 h-5 cursor-pointer"
    :class="unfold && 'masthead__nav-icon--active'"
    @click.stop="toggleUnfold"
  >
    <span
      v-for="(s, i) in new Array(3)"
      :key="'icon-span_' + i"
      class="absolute block transition-transform right-0 bg-black"
    >
    </span>
  </div>
</template>
<style lang="stylus" scoped>
.masthead__nav-icon
  span
    width 18px
    height 3px
    &:nth-child(1)
      top 3px
    &:nth-child(2)
      top 10px
    &:nth-child(3)
      top 17px
  &--active
    span
      background #fff
      &:nth-child(1)
        transform translateY(7px) rotate(45deg)
      &:nth-child(2)
        transform rotate(45deg)
      &:nth-child(3)
        transform translateY(-7px) rotate(-45deg)
</style>
