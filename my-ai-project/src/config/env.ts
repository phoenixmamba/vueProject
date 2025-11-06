/**
 * 环境变量配置
 */
// import {CodeGenTypeEnum} from "@/utils/codeGenTypes.ts";

// 应用部署域名
export const DEPLOY_DOMAIN =  'http://localhost'

// API 基础地址
export const API_BASE_URL =  process.env.NODE_ENV === 'development' ? '' : 'http://localhost:8001/ai-meeting'

// 静态资源地址
export const STATIC_BASE_URL = `${API_BASE_URL}/api/app/static`

// 获取部署应用的完整URL
export const getDeployUrl = (deployKey: string) => {
  return `${DEPLOY_DOMAIN}/${deployKey}`
}

// 获取静态资源预览URL
export const getStaticPreviewUrl = (appId: string) => {
  const baseUrl = `${STATIC_BASE_URL}/${appId}/`
  // 如果是 Vue 项目，浏览地址需要添加 dist 后缀
  // if (codeGenType === CodeGenTypeEnum.VUE_PROJECT) {
  //   return `${baseUrl}dist/index.html`
  // }
  return baseUrl
}