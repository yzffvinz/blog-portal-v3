import fetchApi from '@/libs/fetchApi'
import useUserStore from '@/store/user'
import { useRoute } from 'vue-router'

type LogType = 'show' | 'click'

interface Stats {
  page: string
  type?: LogType
  data?: {
    id?: string | number
    [k: string]: any
  }
}

interface StatsData {
  [k: string]: any
}

function buildFormData(params: StatsData) {
  if (params) {
    const formdata = new FormData()
    Object.keys(params).forEach((key) => {
      let value = params[key]
      if (value) {
        value = typeof value === 'object' ? JSON.stringify(value) : value
        formdata.append(key, value)
      }
    })
    return formdata
  }
  return null
}

function sendLog(params: Stats) {
  const route = useRoute()
  setTimeout(() => {
    const { userStatus } = useUserStore()
    if (!userStatus.isLogin) {
      const formdata = {
        type: params.type,
        data: params.data,
        fullPath: route.fullPath,
        ua: navigator.userAgent,
      }
      navigator.sendBeacon(
        `/api/baecon/${params.page}`,
        buildFormData(formdata)
      )
    }
  }, 3000)
}

/**
 * path: / | list | detail | login
 * type: show
 * value: page | list |
 *
 */
export function doShowLog(page: string, data?: StatsData) {
  sendLog({
    page,
    type: 'show',
    data,
  })
}

export function getSitePV() {
  return fetchApi.get('/api/baecon/pv')
}

export function getListPV(tag: string) {
  return fetchApi.get(`/api/baecon/pvlist?tag=${tag}`)
}

export function getBlogPV(id: string) {
  return fetchApi.get(`/api/baecon/pvdetail?id=${id}`)
}

export default {
  doShowLog,
  getSitePV,
  getListPV,
  getBlogPV,
}
