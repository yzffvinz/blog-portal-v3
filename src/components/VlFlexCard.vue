<script setup lang="ts">
defineProps<{
  articleDetail: {
    img?: string
    title: string
    date?: string
    path: string
  }
}>()
</script>

<template>
  <div class="article article--vertical">
    <div class="article__image-container">
      <div class="article__image-wrap">
        <img
          v-if="articleDetail.img"
          class="article__image"
          :src="articleDetail.img"
        />
      </div>
    </div>
    <div class="article__content">
      <div class="article__title_s">
        {{ articleDetail.title }}
      </div>
      <div v-if="articleDetail.date" class="article__date">
        {{ articleDetail.date }}
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.article
  // margin-bottom 50px
  flex 0 1 100%
  @media (min-width 600px)
    flex 0 1 47.9838709677%
  @media (min-width 1000px)
    flex 0 1 30.6451612903%
.article__image
  width 100%
  display block
  @media (max-width 600px)
    margin-left -20px
    width 100vw
.article__content
  margin-top 18px
  @media (max-width 600px)
    padding 0 20px
.article__title_s
  font-size 20px
  font-weight 400
  line-height 32px
  margin-bottom 14px
.article__date
  font-size 14px
  font-family ABCDiatype, sans-serif
  color #999
</style>
