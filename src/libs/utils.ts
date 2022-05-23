export function formatDateCN(timestamp: number) {
  const months = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二',
  ]
  const date = new Date(timestamp)
  const y = date.getFullYear()
  const m = months[date.getMonth()]
  const d = date.getDate()
  return `${d} ${m}月 ${y}`
}

export function formatDatetime(timestamp: number) {
  const date = new Date(timestamp)
  const [y, m, d, h, min, s] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ].map((item) => item.toString().padStart(2, '0'))
  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

export function estimateMarkdownWords(content: string) {
  if (!content) return 0
  const replaceReg = /(#|\s+|<.*?>|!{0,1}\[.*?\]\(.*?\))/g
  return content.replace(replaceReg, '').length
}

export default {
  formatDateCN,
  formatDatetime,
  estimateMarkdownWords,
}
