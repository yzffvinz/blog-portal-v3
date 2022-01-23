<script setup lang="ts">
import MastHeader from '@components/MastHeader.vue'
</script>

<template>
  <MastHeader title="Booming" />
  <div class="container">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<style lang="stylus">
#app
  margin 0 auto
  display relative
  max-width 1280px
</style>
