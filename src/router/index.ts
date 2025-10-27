import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Dashboard from '../views/Dashboard.vue'
import BooksList from '../views/Book/BooksList.vue'
import BookView from '../views/Book/BookView.vue'
import BookForm from '../views/Book/BookForm.vue'

const routes = [
    { path: '/', component: SignIn, name: 'SignIn' },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            { path: '', redirect: '/dashboard/books' },
            { path: 'books', component: BooksList, name: 'BooksList' },
            { path: 'books/view/:id', component: BookView, props: true, name: 'BookView' },
            { path: 'books/edit/:id', component: BookForm, props: true, name: 'BookEdit' },
            { path: 'books/create', component: BookForm, name: 'BookCreate' },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
