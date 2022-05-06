import { ref } from 'vue'

import { getTags } from '@/api/tag'
import { defineStore } from 'pinia'

export interface Tag {
  name: string
  displayName: string
  color: string
}

const useDictStore = defineStore('dict', () => {
  const tags = ref([] as Tag[])

  getTags().then((data) => {
    tags.value = data.tags
  })

  function getTagInfo(tagName: string): Tag | undefined {
    return tags.value.find(({ name }) => tagName === name)
  }

  return { tags, getTagInfo }
})

export default useDictStore
