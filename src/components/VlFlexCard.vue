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
        class="article__image-wrap cursor-pointer"
        @click.stop="onCardClick(blogDetail._id)"
      >
        <img
          v-if="blogDetail.cover"
          class="article__image"
          :src="blogDetail.cover"
        />
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
          :display-name="tag"
          @tag-click="ontTagClick(tag)"
        >
        </TagTip>
      </ul>
      <div class="article__content mt-4">
        <div
          class="article__title_s text-xl cursor-pointer"
          @click.stop="onCardClick(blogDetail._id)"
        >
          {{ blogDetail.title }}
        </div>
        <div
          v-if="blogDetail.createtime"
          class="article__date cursor-pointer text-sm mt-4 text-c-gary"
          @click.stop="onCardClick(blogDetail._id)"
        >
          {{ formatDate(blogDetail.createtime) }}
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="stylus" scoped></style>
