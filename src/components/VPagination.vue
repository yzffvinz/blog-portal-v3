<script setup lang="ts">
import { totalmem } from 'os'
import { computed, ref } from 'vue'

interface PaginationBean {
  pnum: number
  psize: number
  total: number
}

const props = defineProps<PaginationBean>()

const emits = defineEmits<{
  (e: 'page-change', data: number): void
}>()

function changePage(diff = 1) {
  const nextPage = props.pnum + diff
  if (nextPage >= 1 && nextPage <= Math.ceil(props.total / props.psize)) {
    emits('page-change', nextPage)
  }
}

const start = computed(() => {
  return (props.pnum - 1) * props.psize + 1
})
const end = computed(() => {
  const calced = props.pnum * props.psize - 1
  return calced > props.total ? props.total : calced
})
</script>

<template>
  <nav class="mt-8 msm:px-5">
    <div class="grid grid-cols-3 text-base">
      <div>
        <a
          class="pagination__link theme__link cursor-pointer"
          @click="changePage(-1)"
        >
          上一页
        </a>
      </div>
      <div class="text-center">{{ start }}-{{ end }} of {{ total }}</div>
      <div class="text-right">
        <a class="cursor-pointer" @click="changePage(1)"> 下一页 </a>
      </div>
    </div>
  </nav>
</template>
