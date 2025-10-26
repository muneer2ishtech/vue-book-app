import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'
import BooksList from '../views/BooksList.vue'
import BookView from '../views/BookView.vue'
import BookEdit from '../views/BookEdit.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
    { path: '/signin', name: 'SignIn', component: SignIn },
    { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/books', name: 'Books', component: BooksList, meta: { requiresAuth: true } },
    { path: '/books/:id/view', name: 'BookView', component: BookView, meta: { requiresAuth: true } },
    { path: '/books/:id/edit', name: 'BookEdit', component: BookEdit, meta: { requiresAuth: true } },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.isAuthenticated) next({ name: 'SignIn' })
    else next()
})

export default router
