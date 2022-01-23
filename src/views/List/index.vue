<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import fetchApi from '@/libs/fetchApi'
import VlFlexCard from '@components/VlFlexCard.vue'

const intro = ref({
  description: '',
  name: '',
  path: '',
})

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
    intro.value = data.intro
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
  <div class="listing">
    <div v-if="intro.name" class="listing__tilte">{{ intro.name }}</div>
    <div v-if="intro.description" class="listing__intro">
      <p>{{ intro.description }}</p>
    </div>
    <div class="articles">
      <VlFlexCard
        v-for="(article, index) in articles"
        :key="'article_' + index"
        :article-detail="article"
        @click.stop="onCardClick(article.articleId)"
      />
    </div>
  </div>
</template>

<style lang="stylus">
.listing
  padding 0 20px
  padding-top 80px
  @media (min-width 600px)
    padding-top 130px
  .listing__tilte
    max-width 750px
    text-align center
    margin 0 auto 40px
    font-size 30px
    line-height 38px
    @media (min-width 600px)
      margin-bottom 60px
      font-size 38px
      line-height 52px
  .listing__intro
    max-width 600px
    margin -10px auto 40px
    text-align center
    @media (min-width 600px)
      margin-top -30px
      margin-bottom 60px
  .articles
    display flex
    flex-wrap wrap
    flex-direction row
    justify-content space-between
    align-items flex-start
</style>
