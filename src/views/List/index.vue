<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VlFlexCard from '@components/VlFlexCard.vue'
import FloatElf from '@/components/FloatElf.vue'
import { getBlogList } from '@/api/blog'
import useMainStore from '@/store'
import { obj2querystring } from '@/libs/url'

const store = useMainStore()

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

getBlogList({
  ...params,
}).then(({ tag, blogs: list }) => {
  if (tag) {
    intro.value = tag
  }
  blogs.value = list
})

const router = useRouter()

function toAdd() {
  const { category, tag } = params
  const qs = obj2querystring({ category, tag })
  router.push(`/add?${qs}`)
}
</script>

<template>
  <div class="listing listing--cover">
    <FloatElf v-if="store.isLogin" @elf-click="toAdd">A</FloatElf>
    <div v-if="intro.name" class="listing__tilte">{{ intro.displayName }}</div>
    <div v-if="intro.description" class="listing__intro">
      <p>{{ intro.description }}</p>
    </div>
    <div class="blogs">
      <VlFlexCard
        v-for="(blog, index) in blogs"
        :key="'blog_' + index"
        class="blog__card"
        :blog-detail="blog"
      />
    </div>
  </div>
</template>

<style lang="stylus">
.listing
  padding 0 20px
  padding-top 50px
  @media (min-width 600px)
    padding-top 100px
  .listing__tilte
    max-width 750px
    text-align center
    margin 30px auto 40px
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
  .blogs
    display flex
    flex-wrap wrap
    flex-direction row
    justify-content space-between
    align-items flex-start
    .blog__card
      margin-bottom 30px
      @media (min-width 600px)
        margin-bottom 50px
</style>
