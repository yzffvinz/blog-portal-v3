<script lang="ts" setup>
import { ref, toRefs } from 'vue'

const emits = defineEmits<{
  (e: 'twice-click'): void
  (e: 'triple-click'): void
}>()

const props = defineProps({
  duration: {
    type: Number,
    default: 1000,
    required: false,
  },
})

const MultipleClickEvents = {
  2: 'twice-click',
  3: 'triple-click',
}

let timer = null
let count = 0

function handleClick() {
  if (!timer && !count) {
    timer = setTimeout(() => {
      if (MultipleClickEvents[count]) {
        emits(MultipleClickEvents[count])
      }

      count = 0
      timer = null
    }, props.duration)
  }
  count += 1
}
</script>

<template>
  <div class="cursor-pointer" @click.stop="handleClick">
    <slot></slot>
  </div>
</template>
