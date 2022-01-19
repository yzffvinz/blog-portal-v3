<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import fetchApi from '@/libs/fetchApi'
import VlFlexCard from '@components/VlFlexCard.vue'

const articles = ref([])

fetchApi.get('/api/article/list').then((data) => {
  articles.value = data.files.map(
    (file: { name: string; articleId: string }) => {
      return {
        title: file.name,
        articleId: file.articleId,
        img: '',
      }
    }
  )
})

const router = useRouter()

function onCardClick({
  articleId,
  title,
}: {
  articleId: string
  title: string
}) {
  router.push({
    path: `/detail/${title}/${articleId}`,
  })
}
</script>

<template>
  <div class="articles">
    <VlFlexCard
      v-for="(article, index) in articles"
      :key="'article_' + index"
      :article-detail="article"
      @click.stop="onCardClick(article)"
    />
  </div>
</template>

<style lang="stylus">
.articles
  display flex
  flex-wrap wrap
  flex-direction row
  justify-content space-between
  align-items flex-start
</style>
