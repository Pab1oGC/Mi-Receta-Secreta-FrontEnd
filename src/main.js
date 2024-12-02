import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:5079/api/' // Cambia a la URL de tu backend
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Obtén el token del localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // Agrega el token en los headers
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
app.use(createPinia())
app.use(router)

app.mount('#app')
