import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css' //引入element-plus样式
import router from "@/router";
import '@/assets/icons/index.js' //导入图标
import '@/assets/css/index.less' //初始化样式
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(createPinia())
app.mount('#app')
