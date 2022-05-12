import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import '@/assets/icons/index.js' //导入图标
import '@/assets/css/index.less' //初始化样式
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist' //pinia数据持久化插件

const pinia = createPinia()
pinia.use(piniaPluginPersist)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
