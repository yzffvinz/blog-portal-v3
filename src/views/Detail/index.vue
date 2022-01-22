<script setup lang="ts">
import { computed, ref } from 'vue'
import { marked } from 'marked'
import 'github-markdown-css/github-markdown-light.css'
import fetchApi from '@/libs/fetchApi'
import { useRoute } from 'vue-router'

const { params } = useRoute()

const infos = ref({
  category: '',
  type: '',
  tag: '',
  name: '',
})
const content = ref('')

fetchApi
  .get(`/api/article/detail`, { articleId: params.articleId })
  .then((data) => {
    content.value = marked(data.content)
    infos.value = Object.assign(data, { content: '' })
  })
</script>

<template>
  <article class="post__container">
    <!-- header -->
    <header class="post__header">
      <div class="post__title">
        <!-- {{ infos.type }} {{ infos.tag }} -->
        <h1>
          {{ infos.name }}
        </h1>
      </div>
    </header>
    <!-- contents -->
    <div class="article__columns">
      <div class="article__column--main">
        <div class="article__body">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <article class="markdown-body" v-html="content"></article>
        </div>
      </div>
      <!-- <div class="article__column--aside">1</div> -->
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
