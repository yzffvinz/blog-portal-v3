<script setup lang="ts">
defineProps<{
  name: string
  displayName: string
}>()

const emit = defineEmits(['tagClick'])
</script>
<template>
  <div class="article__category" @click.stop="$emit('tagClick', name)">
    <a>{{ displayName }}</a>
  </div>
</template>

<style lang="stylus" scoped>
.article__category
  display inline-block
  font-weight bold
  font-size 13px
  line-height 23px
  color #000
  word-wrap nowrap
  text-transform uppercase
  a
    display inline-block
    position relative
    z-index 0
    padding-bottom 3px
    color #000
    text-decoration none
    border-bottom-color #ffc832
    margin-right 15px
    &:after
      content ''
      position absolute
      left 0
      width 100%
      bottom 2px
      height 2px
      background-color #000
      transform-origin 50%
      transition all 0.3s ease-in-out
      background-color #ffc832
    &:hover
      &::after
        transform scaleX(0)
</style>
