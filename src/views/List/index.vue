<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import fetchApi from '@/libs/fetchApi'
import VlFlexCard from '@components/VlFlexCard.vue'

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

fetchApi
  .get('/api/blog/list', {
    ...params,
  })
  .then(({ tag, blogs: list }) => {
    intro.value = tag
    blogs.value = list
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
    <div v-if="intro.name" class="listing__tilte">{{ intro.displayName }}</div>
    <div v-if="intro.description" class="listing__intro">
      <p>{{ intro.description }}</p>
    </div>
    <div class="articles">
      <VlFlexCard
        v-for="(blog, index) in blogs"
        :key="'article_' + index"
        :blog-detail="blog"
        @click.stop="onCardClick(blog._id)"
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
