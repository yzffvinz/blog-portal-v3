<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FloatElf from '@/components/FloatElf.vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { getBlogDetail } from '@/api/blog'
import useMainStore from '@/store'

const { params } = useRoute()
const { id } = params as { id: string }

const router = useRouter()

const store = useMainStore()

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

function toEdit() {
  router.push(`/edit/${id}`)
}

getBlogDetail({ _id: id }).then(({ blog }) => {
  blogDetail.value = blog
})
</script>

<template>
  <article
    class="post__container max-w-screen-xl mx-auto my-0 pt-20 px-5 sm:pt-32"
  >
    <FloatElf v-if="store.isLogin" @elf-click="toEdit">M</FloatElf>
    <!-- header -->
    <header
      class="post__header pb-12 lg:mb-16 lg:border-solid lg:border-0 lg:border-b lg:border-divide"
    >
      <div
        class="post__title px-auto py-0 mx-auto w-3/4 max-w-3xl text-center break-normal text-2xl sm:text-4xl lg:text-5xl"
      >
        <h1>
          {{ blogDetail.title }}
        </h1>
      </div>
    </header>
    <!-- contents -->
    <div class="article__columns">
      <div class="article__column--main">
        <div class="article__body">
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
