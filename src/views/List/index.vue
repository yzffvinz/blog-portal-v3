<script setup lang="ts">
import { reactive, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VlFlexCard from '@components/VlFlexCard.vue'
import VPagination from '@/components/VPagination.vue'
import FloatElf from '@/components/FloatElf.vue'
import { getBlogList } from '@/api/blog'
import useMainStore from '@/store'
import { obj2querystring } from '@/libs/url'
import { BlogDetail, TagDetail } from '@/types/types'

const psize = 18

const store = useMainStore()

const state = reactive({
  intro: {} as TagDetail,
  blogs: [] as BlogDetail[],
  pnum: 1,
  total: 0,
})

const { params } = useRoute()

function queryBlogs(pnum: number) {
  getBlogList({
    ...params,
    psize,
    pnum,
  }).then(({ tag, blogs: list, total }) => {
    if (tag) {
      state.intro = tag
    }
    state.blogs = list
    state.total = total
  })
}

watch(
  () => state.pnum,
  (pnum) => {
    queryBlogs(pnum)
  },
  {
    immediate: true,
  }
)

function setPageNum(pnum: number) {
  state.pnum = pnum
  window.scrollTo(0, 0)
}

// 新增
const router = useRouter()

function toAdd() {
  const { category, tag } = params
  const qs = obj2querystring({ category, tag })
  router.push(`/add?${qs}`)
}
const { intro, blogs, pnum, total } = toRefs(state)
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
    <VPagination
      :pnum="pnum"
      :psize="psize"
      :total="total"
      @page-change="setPageNum"
    ></VPagination>
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
    <VPagination
      :pnum="pnum"
      :psize="psize"
      :total="total"
      @page-change="setPageNum"
    ></VPagination>
  </div>
</template>
