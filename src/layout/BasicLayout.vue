<script setup lang="ts">
import MastHeader from '@components/MastHeader.vue'
</script>

<template>
  <MastHeader title="Gray" />
  <router-view></router-view>
</template>

<style lang="stylus">
#app
  margin 0 auto
  display relative
  max-width 1280px
  padding 0 20px
  .articles
    display flex
    flex-wrap wrap
    flex-direction row
    justify-content space-between
    align-items flex-start
</style>
