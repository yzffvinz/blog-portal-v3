<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function toHome() {
  router.push({
    path: '/',
  })
}

defineProps<{ title: string }>()
</script>

<template>
  <div class="masthead-container">
    <header>
      <div class="header-title" @click.stop="toHome">
        <span>
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
