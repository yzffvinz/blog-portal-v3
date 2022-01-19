import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import '@/style/reset.css'

createApp(App).use(router).mount('#app')
