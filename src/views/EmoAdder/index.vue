<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getBlogDetail, modBlog } from '@/api/blog'
import { formatDatetime } from '@/libs/utils'
import { ElInput, ElButton } from 'element-plus'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/button/style/css'

const router = useRouter()

const EMO_BLOGID = '620215c6cf6a2a5c64636ea3'
const datetime = formatDatetime(Date.now())
const emo = ref('')
const blogDetail = ref({
  title: '',
  cover: '',
  description: '',
  category: '',
  tags: [] as string[],
  content: '',
  hide: 0,
})

getBlogDetail({ _id: EMO_BLOGID }).then(({ blog }) => {
  blogDetail.value = blog
})

function commitEmo() {
  const content = [`### ${datetime}`, '', emo.value, ''].join('\n')
  blogDetail.value.content = content + blogDetail.value.content
  modBlog(blogDetail.value).then(() => {
    router.push(`/detail/${EMO_BLOGID}`)
  })
}
</script>

<template>
  <div class="add__container pt-24 px-5 pb-16">
    <h3>时间：{{ datetime }}</h3>
    <div class="pt-8">
      <ElInput v-model="emo" :rows="3" type="textarea" placeholder="写下心情" />
    </div>
    <div class="pt-8">
      <ElButton type="primary" @click="commitEmo">提交</ElButton>
    </div>
  </div>
</template>
