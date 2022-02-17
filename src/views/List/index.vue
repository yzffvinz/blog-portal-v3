<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VlFlexCard from '@components/VlFlexCard.vue'
import FloatElf from '@/components/FloatElf.vue'
import { getBlogList } from '@/api/blog'
import useMainStore from '@/store'
import { obj2querystring } from '@/libs/url'

const store = useMainStore()

const intro = ref({
  name: '',
  displayName: '',
  description: '',
})

const blogs = ref([
  {
    _id: '',
    title: '',
    cover: '',
    description: '',
    author: '',
    category: '',
    tags: [],
    createtime: 0,
    updatetime: 0,
    content: '',
  },
])

const { params } = useRoute()

getBlogList({
  ...params,
}).then(({ tag, blogs: list }) => {
  if (tag) {
    intro.value = tag
  }
  blogs.value = list
})

const router = useRouter()

function toAdd() {
  const { category, tag } = params
  const qs = obj2querystring({ category, tag })
  router.push(`/add?${qs}`)
}
</script>

<template>
  <div class="listing pt-12 sm:pt-24 sm:px-5">
    <FloatElf v-if="store.isLogin" @elf-click="toAdd">A</FloatElf>
    <div
      v-if="intro.name"
      class="listing__tilte mx-auto mt-8 mb-10 max-w-3xl text-4xl text-center sm:mb-14"
    >
      {{ intro.displayName }}
    </div>
    <div
      v-if="intro.description"
      class="-mt-2 mx-auto mb-10 max-w-screen-sm text-center sm:mb-16"
    >
      <p>{{ intro.description }}</p>
    </div>
    <div
      class="blogs grid grid-cols-1 sm:grid-cols-2 sm:gap-1/25 gap-y-10 sm:gap-y-10 lg:grid-cols-3"
    >
      <VlFlexCard
        v-for="(blog, index) in blogs"
        :key="'blog_' + index"
        class="blog__card"
        :blog-detail="blog"
      />
    </div>
  </div>
</template>
