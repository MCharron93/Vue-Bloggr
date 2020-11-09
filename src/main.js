import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import bootstrap from 'bootstrap'
import popper from 'popper.js'

createApp(App).use(router, popper, bootstrap).mount('#app')
