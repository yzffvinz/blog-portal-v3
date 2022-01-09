<script setup lang="ts">
import { onMounted, ref } from 'vue'

const hidden = ref(false)

onMounted(() => {
  window.addEventListener(
    'scroll',
    (e) => {
      const scrollTop =
        e.target.documentElement.scrollTop || e.target.body.scrollTop
      hidden.value = scrollTop > 100
    },
    true
  )
})

function scrollToTop() {
  window.scrollTo(0, 30)
}

defineProps<{ title: string }>()
</script>

<template>
  <header>
    <div class="header-title" @click.stop="scrollToTop">
      <span v-if="!hidden">
        {{ title.toUpperCase() }}
      </span>
    </div>
  </header>
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
    @media (min-width: 600px)
      height 70px
</style>
