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
  <article class="post__container">
    <FloatElf v-if="store.isLogin" @elf-click="toEdit">M</FloatElf>
    <!-- header -->
    <header class="post__header">
      <div class="post__title">
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

<style lang="stylus" scoped>
.post__container
  max-width 1280px
  margin 0 auto
  padding 0 20px
  padding-top 80px
  @media (min-width 600px)
    padding-top 125px
  .post__header
    padding-bottom 60px
    @media (min-width 1000px)
      padding-bottom 60px
      margin-bottom 60px
      border-bottom 1px #e3e3e3 solid
    .post__title
      margin 0 auto
      max-width 750px
      text-align center
      line-height 1.3
      word-wrap break-word
      font-size 26px
      @media (min-width 600px)
        font-size 38px
      @media (min-width 1000px)
        font-size 50px
</style>
