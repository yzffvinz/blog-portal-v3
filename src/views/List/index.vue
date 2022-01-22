<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import fetchApi from '@/libs/fetchApi'
import VlFlexCard from '@components/VlFlexCard.vue'

const articles = ref([
  {
    title: '',
    articleId: '',
    path: '',
  },
])

const { params } = useRoute()

fetchApi
  .get('/api/article/list', {
    ...params,
  })
  .then((data) => {
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

function onCardClick(articleId: string) {
  router.push({
    path: `/detail/${articleId}`,
  })
}
</script>

<template>
  <div class="articles">
    <VlFlexCard
      v-for="(article, index) in articles"
      :key="'article_' + index"
      :article-detail="article"
      @click.stop="onCardClick(article.articleId)"
    />
  </div>
</template>

<style lang="stylus">
.articles
  padding 0 20px
  display flex
  flex-wrap wrap
  flex-direction row
  justify-content space-between
  align-items flex-start
  padding-top 50px
  @media (min-width 600px)
    padding-top 90px
  @media (min-width 1000px)
    padding-top 120px
</style>
