<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { throttle } from '@/common/utils.ts'

const hidden = ref(false)
const onScorll = throttle((e) => {
  const scrollTop =
    e.target.documentElement.scrollTop || e.target.body.scrollTop
  hidden.value = scrollTop > 100
})

onMounted(() => {
  window.addEventListener('scroll', onScorll, true)
})

function scrollToTop() {
  window.scrollTo(0, 30)
}

defineProps<{ title: string }>()
</script>

<template>
  <div class="masthead-container">
    <header>
      <div class="header-title" @click.stop="scrollToTop">
        <span v-if="!hidden">
          {{ title.toUpperCase() }}
        </span>
      </div>
    </header>
  </div>
</template>

<style lang="stylus" scoped>
header
  position fixed
  top 0
  left 50%
  transform translateX(-50%)
  width 100%
  z-index 1000
  background #FFF
  max-width 1280px
  padding 0 20px
  border-bottom 1px #cdcdcd solid
  .header-title
    display flex
    align-items center
    justify-content center
    height 50px
    font-size 32px
    @media (min-width 600px)
      height 70px
</style>
