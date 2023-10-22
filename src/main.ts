import { createApp } from 'vue'
import App from './App.vue'

// package

// elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'

// router
import router from './router'
// pinia
import pinia from './store'
//css
import '@/styles/index.scss'
// router guid
import './permission';
// 自定义全局组件
import gloalComponent from '@/components';

const app = createApp(App);
//安装自定义插件
app.use(gloalComponent);
app.use(ElementPlus);
app.use(router)
app.use(pinia)
.mount('#app')
