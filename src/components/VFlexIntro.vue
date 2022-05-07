<script setup lang="ts">
import { formatDatetime } from '@/libs/utils'

defineProps<{
  blogIntro: {
    content: string
    cover: string
    description: string
    author: string
    createtime: number
    updatetime: number
    // viewcount: number
  }
}>()
</script>
<template>
  <section class="post__intro">
    <img v-if="blogIntro.cover" :src="blogIntro.cover" class="w-full" />
    <div
      v-if="blogIntro.description"
      class="post__description text-gray sm:text-2xl sm:mt-8"
    >
      {{ blogIntro.description }}
    </div>
    <div
      class="post__meta flex flex-col flex-wrap text-sm leading-6 text-gray mt-8 mb-10"
    >
      <p>
        作者: <span class="text-black">{{ blogIntro.author }}</span
        >，约{{ blogIntro.content.replace(/(#|\n|)/g, '').length }}字
      </p>
      <p>创建于：{{ formatDatetime(blogIntro.createtime) }}</p>
      <p>更新于：{{ formatDatetime(blogIntro.updatetime) }}</p>
      <!-- <div>浏览量：{{ blogIntro.viewcount }}</div> -->
    </div>
  </section>
</template>
