<script setup lang="ts">
import MastHeader from '@components/MastHeader.vue'
</script>

<template>
  <MastHeader title="Gray" />
  <div class="container">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<style lang="stylus">
#app
  margin 0 auto
  display relative
  max-width 1280px
.container
  padding-top 50px
  @media (min-width: 600px)
    padding-top 90px
  @media (min-width: 1000px)
    padding-top 120px
</style>
