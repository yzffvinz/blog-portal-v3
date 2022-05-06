<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElSwitch,
} from 'element-plus'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/switch/style/css'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useRoute, useRouter } from 'vue-router'
import useDictStore from '@/store/dict'
import { getCategories } from '@/api/tag'
import { addBlog, getBlogDetail, modBlog } from '@/api/blog'
import upload from '@/biz/uploadApi'

interface ValidateForm {
  validate: (validateFunc: (valid: boolean) => boolean) => void
}

const router = useRouter()

const ruleFormRef = ref()

const categories = ref([
  {
    name: '',
    displayName: '',
  },
])

const { tags } = useDictStore()

const blogDetail = ref({
  title: '',
  cover: '',
  description: '',
  category: '',
  tags: [] as string[],
  content: '',
  hide: 0,
})

getCategories().then((data) => {
  categories.value = data.categories
})

const { params, query } = useRoute()

const { id } = params as { id: string | undefined }

// 有id 为修改
if (id) {
  getBlogDetail({ _id: id }).then(({ blog }) => {
    blogDetail.value = blog
  })
} else {
  const { category, tag } = query as { category?: string; tag?: string }
  if (category) blogDetail.value.category = category
  if (tag) blogDetail.value.tags.push(tag)
}

function submitForm(formEl: ValidateForm, leave = true) {
  formEl.validate((valid: boolean) => {
    if (valid) {
      const isAdd = !params.id
      const reqApi = isAdd ? addBlog : modBlog
      reqApi(blogDetail.value)
        .then((data) => {
          if (isAdd || leave) {
            const targetId = data.insertedId || params.id
            router.push(`/detail/${targetId}`)
          }
        })
        .catch((msg) => {
          alert(msg)
        })
      return true
    }
    return false
  })
}

function uploadImg(files: FileList, callback: (imgs: string[]) => void) {
  upload(files, callback, id || undefined)
}

const rules = reactive({
  title: { required: true },
  content: { required: true },
})
</script>
<template>
  <div class="add__container pt-24 px-5 pb-16">
    <ElForm
      ref="ruleFormRef"
      :model="blogDetail"
      :rules="rules"
      label-position="right"
      :label-width="55"
    >
      <ElFormItem label="标题" prop="title">
        <ElInput v-model="blogDetail.title"></ElInput>
      </ElFormItem>
      <ElFormItem label="封面">
        <ElInput v-model="blogDetail.cover"></ElInput>
      </ElFormItem>
      <ElFormItem label="描述">
        <ElInput v-model="blogDetail.description"></ElInput>
      </ElFormItem>
      <ElFormItem label="分类">
        <ElSelect v-model="blogDetail.category">
          <ElOption
            v-for="category in categories"
            :key="'category_' + category.name"
            :value="category.name"
            :label="category.displayName"
          >
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="标签">
        <ElSelect v-model="blogDetail.tags" multiple filterable>
          <ElOption
            v-for="tag in tags"
            :key="'tag_' + tag.name"
            :value="tag.name"
            :label="tag.displayName"
          >
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="正文" prop="content">
        <MdEditor
          v-model="blogDetail.content"
          preview-theme="github"
          :preview="false"
          :toolbars-exclude="['htmlPreview']"
          @upload-img="uploadImg"
          @save="submitForm(ruleFormRef, false)"
        />
      </ElFormItem>
      <ElFormItem label="私密">
        <ElSwitch
          v-model="blogDetail.hide"
          :active-value="1"
          :inactive-value="0"
        ></ElSwitch>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="submitForm(ruleFormRef)">
          提交
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>
