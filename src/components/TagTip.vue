<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import useDictStore from '@/store/dict'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

const dict = useDictStore()
const tagInfo = computed(() => {
  return dict.getTagInfo(props.name)
})

const styleLine = `
  --unline-color: ${tagInfo.value?.color || '#ffc832'};
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
      >{{ tagInfo?.displayName || name }}
    </a>
  </RouterLink>
</template>

<style lang="stylus" scoped>
.article__category a:after
  content ''
  background-color var(--unline-color)
</style>
