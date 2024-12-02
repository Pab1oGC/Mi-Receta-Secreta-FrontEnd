import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CreateUser from '../views/CreateUser.vue'
import UserList from '../views/UserList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, // Indica que esta ruta requiere autenticación
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: CreateUser,
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      name: 'user-list',
      component: UserList,
      meta: { requiresAuth: true },
    },
  ],
})

// Guard global para verificar autenticación
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local

  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    if (!token) {
      // Si no hay token, redirige al login
      return next('/login');
    }

    // Opcional: Validar el token con el backend
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token JWT
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp < currentTime) {
        // Si el token está expirado, redirige al login
        localStorage.removeItem('token');
        return next('/login');
      }
    } catch (error) {
      // Si el token no es válido, redirige al login
      localStorage.removeItem('token');
      return next('/login');
    }
  }

  // Si está autenticado o la ruta no requiere autenticación, continúa
  next();
});

export default router