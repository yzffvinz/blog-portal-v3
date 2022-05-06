<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
</script>

<template>
  <div class="article article--vertical">
    <div class="article__image-container">
      <div class="article__image-wrap cursor-pointer">
        <RouterLink :to="`/detail/${blogDetail._id}`">
          <img
            v-if="blogDetail.cover"
            class="article__image min-w-full"
            :src="blogDetail.cover"
          />
        </RouterLink>
      </div>
    </div>
    <section class="msm:px-5">
      <ul
        v-if="blogDetail.tags && blogDetail.tags.length"
        class="article__categories mt-4"
      >
        <TagTip
          v-for="(tag, index) in blogDetail.tags"
          :key="'tag_' + tag + index"
          :name="tag"
        >
        </TagTip>
      </ul>
      <div class="article__content mt-4">
        <RouterLink :to="`/detail/${blogDetail._id}`">
          <div class="article__title_s text-xl cursor-pointer">
            {{ blogDetail.title }}
          </div>
        </RouterLink>
        <div
          v-if="blogDetail.createtime"
          class="article__date cursor-pointer text-sm mt-4 text-gray"
        >
          <RouterLink :to="`/detail/${blogDetail._id}`">
            {{ formatDate(blogDetail.createtime) }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="stylus" scoped></style>
