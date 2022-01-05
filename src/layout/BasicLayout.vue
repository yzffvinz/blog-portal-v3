<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import '@/style/reset.styl'
import VlHeader from '@components/VlHeader.vue'
</script>

<template>
  <VlHeader title="Vincent Home" />
  <router-view></router-view>
</template>

<style lang="stylus">
#app
  margin 0 auto
  display relative
  max-width 1280px
  padding 100px 20px 0px
  .articles
    display flex
    flex-wrap wrap
    flex-direction row
    justify-content space-between
    align-items flex-start
</style>
