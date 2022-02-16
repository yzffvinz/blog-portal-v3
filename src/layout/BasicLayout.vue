<script setup lang="ts">
import MastHeader from '@components/MastHeader.vue'
</script>

<template>
  <MastHeader title="B👀 Ming✨" />
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang="stylus">
#app
  margin 0 auto
  display relative
  max-width 1280px
  padding-bottom 60px
</style>
