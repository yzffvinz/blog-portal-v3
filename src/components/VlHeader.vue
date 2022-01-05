<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ title: string }>();
const test = ref(0);
</script>

<template>
  <header>
    <div class="header-title">
      {{ title.toUpperCase() }}
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
        height 70px
        font-size 28px
    // @media screen and (min-width: 900px)
    //   max-width 680px
</style>
