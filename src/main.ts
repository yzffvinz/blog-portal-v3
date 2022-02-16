import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import '@/assets/style/index.css'

createApp(App).use(router).use(createPinia()).mount('#app')
