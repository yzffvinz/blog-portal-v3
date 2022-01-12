<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import VlFlexCard from '@components/VlFlexCard.vue'

const mock = [
  {
    img: 'https://www.creativeboom.com/uploads/articles/fd/fd7e5e23542c0b880e3a32b11228e41359766a40_620.jpg',
    title:
      'New Yorker Amanda Ginzburg shares the top five books that have shaped her creative career',
    date: '4 January 2022',
  },
  {
    img: 'https://www.creativeboom.com/uploads/articles/2a/2a194d6802ef10a215395836a3e0036ea8cc1880_620.jpg',
    title:
      "Franklin Azzi's halo light is a heavenly blend of art and engineering",
    date: '4 January 2022',
  },
  {
    img: 'https://www.creativeboom.com/uploads/articles/a4/a472b64d675e523fd6b2233c1f37d1f7b0318130_620.jpg',
    title:
      'British artist Alex Chinneck bends a giant spiral staircase against a building in Brighton',
    date: '20 December 2021',
  },
  {
    img: 'https://www.creativeboom.com/uploads/articles/2a/2a7ac5ca0ee994a547baf222b4b659d264db5e67_620.jpg',
    title:
      'Anna Mantzaris directs The New Normal, a moving short that tributes awkward reunions this Christmas',
    date: '17 December 2021',
  },
]
const articles = ref([])

fetch('/api/article/list')
  .then((res) => res.json())
  .then((data) => {
    articles.value = data.files.map((file: { name: string; path: string }) => {
      return {
        title: file.name,
        path: file.path,
      }
    })
  })

const router = useRouter()

function onCardClick({ path, title }: { path: string; title: string }) {
  router.push({
    path: `/detail/${encodeURIComponent(title)}/${encodeURIComponent(path)}`,
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
