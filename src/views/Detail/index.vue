<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import FloatElf from '@/components/FloatElf.vue'
import TagTip from '@/components/TagTip.vue'
import VFlexIntro from '@/components/VFlexIntro.vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { getBlogDetail } from '@/api/blog'
import useUserStore from '@/store/user'
import { doShowLog, getBlogPV } from '@/api/stat'

const { params } = useRoute()
const { id } = params as { id: string }

doShowLog('detail', { id })

const { userStatus } = useUserStore()

const blogDetail = ref({
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
})

const blogPV = ref(0)

getBlogDetail({ _id: id }).then(({ blog }) => {
  blogDetail.value = blog
})

getBlogPV(id).then(({ count }) => {
  blogPV.value = count
})
</script>

<template>
  <article
    class="post__container max-w-screen-xl mx-auto my-0 pt-20 px-5 sm:pt-24"
  >
    <RouterLink v-if="userStatus.isLogin" :to="`/edit/${blogDetail._id}`">
      <FloatElf>M</FloatElf>
    </RouterLink>
    <!-- header -->
    <header
      class="post__header pb-12 lg:mb-16 lg:border-solid lg:border-0 lg:border-b lg:border-divide"
    >
      <div class="post__title px-auto py-0 mx-auto w-3/4 max-w-3xl text-center">
        <ul v-if="blogDetail.tags && blogDetail.tags.length" class="pb-10">
          <TagTip
            v-for="(tag, index) in blogDetail.tags"
            :key="'tag_' + tag + index"
            :name="tag"
          >
          </TagTip>
        </ul>
        <h1 class="break-normal text-2xl sm:text-4xl lg:text-5xl">
          {{ blogDetail.title }}
        </h1>
      </div>
    </header>
    <!-- contents -->
    <div class="article__columns">
      <div class="article__column--main">
        <VFlexIntro :blog-intro="{ ...blogDetail, pv: blogPV }"></VFlexIntro>
        <div class="post__content">
          <MdEditor
            :model-value="blogDetail.content"
            preview-theme="github"
            show-code-row-number
            preview-only
          ></MdEditor>
        </div>
      </div>
    </div>
  </article>
</template>
