import fetchApi from '@/libs/fetchApi'

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
      if (params[key]) {
        formdata.append(key, JSON.stringify(params[key]))
      }
    })
    return formdata
  }
  return null
}

function sendLog(params: Stats) {
  navigator.sendBeacon(
    `/api/baecon/${params.page}`,
    buildFormData({
      type: params.type,
      data: params.data,
    })
  )
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
