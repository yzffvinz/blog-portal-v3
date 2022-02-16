import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import '@/assets/style/index.css'
import '@/assets/style/reset.css'

createApp(App).use(router).use(createPinia()).mount('#app')
