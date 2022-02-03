<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import fetchApi from '@/libs/fetchApi'

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

const menus = ref([
  {
    name: '',
    displayName: '',
    children: [
      {
        name: '',
        displayName: '',
      },
    ],
  },
])

const title = ref('')
const tags = ref([])
const text = ref('')

fetchApi.get(`/api/tag/menu`).then((data) => {
  menus.value = data.menus
})

const { params } = useRoute()
fetchApi.get(`/api/blog/detail`, { _id: params.id }).then(({ blog }) => {
  blogDetail.value = blog
  title.value = blog.title
  tags.value = blog.tags
  text.value = blog.content
})

function doSomething() {
  console.log(text.value)
}
</script>
<template>
  <div class="edit__container">
    <input v-model="title" type="text" />
    <div class="category__wrapper">
      {{ blogDetail.category }}
    </div>
    <div class="tags__wrapper">
      <div
        v-for="(tag, index) in tags"
        :key="'tag_' + tag + index"
        class="tag__item"
      >
        {{ tag }}
      </div>
      <select id="" name="">
        <template v-for="category in menus">
          <option
            v-for="(tag, index) in category.children"
            :key="'tag_' + index"
            :value="tag.name"
          >
            {{ tag.displayName }}
          </option>
        </template>
      </select>
    </div>
    <MdEditor
      v-model="text"
      :preview="false"
      preview-theme="github"
      :toolbars="[
        'bold',
        'title',
        'quote',
        'unorderedList',
        'orderedList',
        'code',
        'codeRow',
        'table',
        'image',
        '-',
        'preview',
        'save',
      ]"
      @save="doSomething"
    />
  </div>
</template>
<style lang="stylus" scoped>
.edit__container
  padding 100px 20px 60px
  *
    margin-bottom 20px
</style>
