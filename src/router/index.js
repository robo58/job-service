import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminPanel from '../views/admin/AdminPanel'
import Profile from '../views/profile/Profile'
import Jobs from '../views/jobs/Jobs'
import EditJob from '../views/jobs/EditJob'
import ShowJob from '../views/jobs/ShowJob'
import Register from '../views/auth/Register'
import Login from '../views/auth/Login'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/jobs'
    },
    {
        path: '/admin-panel',
        name: 'Admin panel',
        component: AdminPanel
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/jobs',
        name: 'Jobs',
        component: Jobs
    },
    {
        path: '/jobs/:id',
        name: 'ShowJob',
        component: ShowJob
    },
    {
        path: '/jobs/:id/edit',
        name: 'EditJob',
        component: EditJob
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router