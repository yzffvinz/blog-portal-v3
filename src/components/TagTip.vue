<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps({
  name: {
    type: String,
    default: undefined,
  },
  displayName: {
    type: String,
    default: 'unknown',
  },
  color: {
    type: String,
    default: '#ffc832',
  },
})

const emit = defineEmits(['tagClick'])

const styleLine = `
  --unline-color: ${props.color};
  --tw-contents: '';
`
</script>
<template>
  <RouterLink
    class="article__category cursor-pointer inline-block font-bold text-xs text-black whitespace-nowrap uppercase"
    :to="`/list/${name}`"
  >
    <a
      class="inline-block relative z-0 pb-1 text-black no-underline mr-4 after:absolute after:left-0 after:bottom-0.5 after:h-0.5 after:w-full after:bg-black after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-0"
      :style="styleLine"
      >{{ displayName }}
    </a>
  </RouterLink>
</template>

<style lang="stylus" scoped>
.article__category a:after
  content ''
  background-color var(--unline-color)
</style>
