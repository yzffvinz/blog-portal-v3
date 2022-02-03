<script setup lang="ts">
import { useRouter } from 'vue-router'
import TagTip from '@/components/TagTip.vue'

defineProps<{
  blogDetail: {
    _id: string
    title: string
    cover: string
    description: string
    author: string
    category: string
    tags: string[]
    createtime: number
    updatetime: number
    content: string
  }
}>()

const router = useRouter()

function formatDate(timestamp: number) {
  const months = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二',
  ]
  const date = new Date(timestamp)
  const y = date.getFullYear()
  const m = months[date.getMonth()]
  const d = date.getDate()
  return `${d} ${m}月 ${y}`
}

function onCardClick(articleId: string) {
  router.push({
    path: `/detail/${articleId}`,
  })
}

function ontTagClick(tag: string) {
  router.push({
    path: `/list/${tag}`,
  })
}
</script>

<template>
  <div class="article article--vertical">
    <div class="article__image-container">
      <div
        class="article__image-wrap"
        @click.stop="onCardClick(blogDetail._id)"
      >
        <img
          v-if="blogDetail.cover"
          class="article__image"
          :src="blogDetail.cover"
        />
      </div>
    </div>
    <ul class="article__categories">
      <TagTip
        v-for="(tag, index) in blogDetail.tags"
        :key="'tag_' + tag + index"
        :name="tag"
        :display-name="tag"
        @tag-click="ontTagClick(tag)"
      >
      </TagTip>
    </ul>
    <div class="article__content">
      <div class="article__title_s" @click.stop="onCardClick(blogDetail._id)">
        {{ blogDetail.title }}
      </div>
      <div
        v-if="blogDetail.createtime"
        class="article__date"
        @click.stop="onCardClick(blogDetail._id)"
      >
        {{ formatDate(blogDetail.createtime) }}
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
  // display flex
  // align-items center
  @media (max-width 600px)
    padding 0 20px
  .article__title_s
    font-size 20px
    font-weight 400
    line-height 32px
    margin-bottom 14px
  .article__date
    font-size 14px
    color #999
    // margin-left 15px
    // transform translateY(2px)
.article__categories
  display flex
  flex-wrap nowrap
  margin-top 18px
  margin-bottom 14px
</style>
