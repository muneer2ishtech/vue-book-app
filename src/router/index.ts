import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'
import BooksList from '../views/BooksList.vue'
import BookView from '../views/BookView.vue'
import BookEdit from '../views/BookEdit.vue'
import UserProfilesList from '../views/UserProfilesList.vue'
import UserProfileView from '../views/UserProfileView.vue'
import { useAuthStore } from '../stores/auth'

interface RouteMeta {
    requiresAuth?: boolean
    adminOnly?: boolean
}

const routes: Array<RouteRecordRaw> = [
    { path: '/signin', name: 'SignIn', component: SignIn },
    { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/books', name: 'Books', component: BooksList, meta: { requiresAuth: true } },
    { path: '/books/:id/view', name: 'BookView', component: BookView, meta: { requiresAuth: true } },
    { path: '/books/:id/edit', name: 'BookEdit', component: BookEdit, meta: { requiresAuth: true } },
    { path: '/users', name: 'UserProfiles', component: UserProfilesList, meta: { requiresAuth: true, adminOnly: true } },
    { path: '/users/:id/view', name: 'UserProfileView', component: UserProfileView, meta: { requiresAuth: true } }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return next({ name: 'SignIn' })
    }

    if (to.meta.adminOnly && !auth.isAdmin) {
        return next({ name: 'Home', query: { error: '403' } })
    }

    if (to.name === 'UserProfileView' && !auth.isAdmin) {
        const requestedId = String(to.params.id)
        if (requestedId !== String(auth.user.userId)) {
            return next({ name: 'Home', query: { error: '403' } })
        }
    }

    next()
})

export default router
