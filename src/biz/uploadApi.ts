import COS from 'cos-js-sdk-v5'
import { getDateStr } from '@/libs/date'
import useUserStore from '@/store/user'

const { userInfo } = useUserStore() // 用户信息

let cos: COS | null = null // 单例的 COS 实例
function getCos(): COS {
  if (!cos) {
    cos = new COS({
      SecretId: userInfo.SecretId,
      SecretKey: userInfo.SecretKey,
    })
  }
  return cos
}

// 生成文件名
function genFileName(
  dir: string = getDateStr(),
  prefix: string = String(Date.now()),
  filename = '.png'
) {
  return `articles/${dir}/${prefix}-${filename}`
}

export default function uploadImg(
  files: FileList,
  callback: (imgs: string[]) => void,
  dir: string = getDateStr(),
  prefix: string = String(Date.now())
) {
  const uploadFileList = Array.from(files).map((file) => {
    const path = genFileName(dir, prefix, file.name)
    return {
      Bucket: userInfo.Bucket,
      Region: userInfo.Region,
      Key: path,
      Body: file,
    }
  })

  getCos()
    .uploadFiles({
      files: uploadFileList,
      SliceSize: 1024 * 1024 * 10 /* 设置大于10MB采用分块上传 */,
    })
    .then((data) => {
      callback(data.files.map((img) => `http://${img.data.Location}`))
    })
}
