import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

export const useMessage = () => {
 return {
   // 错误消息
   error(content: string) {
     ElMessage.error(content)
   },
   // 成功消息
   success(content: string) {
     ElMessage.success(content)
   },
   // 警告消息
   warning(content: string) {
     ElMessage.warning(content)
   },
 }
}
