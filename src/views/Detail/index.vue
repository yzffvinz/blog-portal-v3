<script setup lang="ts">
import { ref } from 'vue'
// import MdEditor from 'md-editor-v3'
// import 'md-editor-v3/lib/style.css'
import { marked } from 'marked'
import 'github-markdown-css/github-markdown-light.css'
import { useRoute } from 'vue-router'

const title = ref('')
const content = ref('')

const { params } = useRoute()

const props = ref(params)

fetch(`/api/article/detail?articlePath=${params.path}`)
  .then((response) => response.json())
  .then((data) => {
    content.value = marked(data.detail)
  })
</script>

<template>
  <article>
    <!-- header -->
    <header>
      <div class="article__header">
        <h1>{{ props.title }}</h1>
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
.article__title
  padding-bottom 60px
</style>
