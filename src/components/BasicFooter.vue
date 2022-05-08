<script setup lang="ts">
import { ref } from 'vue'
import { getSitePV } from '@/api/stat'

const pv = ref(0)
getSitePV().then(({ count }) => {
  pv.value = count
})
</script>

<template>
  <div class="bg-footer mt-14 py-8 w-full">
    <div class="footer__accreditations mx-auto px-5 flex flex-col items-center">
      <p>Vincent Home</p>
      <a href="https://beian.miit.gov.cn/" target="_blank">
        京ICP备2021038687号-1
      </a>
      <p class="text-gray text-sm">本站已被访问 {{ pv }} 次</p>
    </div>
  </div>
</template>
<style scoped></style>
