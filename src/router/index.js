import Vue from 'vue'
import Router from 'vue-router'

const All = () => import(/* webpackChunkName: "min" */ '@/components/all/all')
const Details = () => import(/* webpackChunkName: "min" */ '@/components/details/details')
const Review = () => import(/* webpackChunkName: "min" */ '@/components/review/review')
const Unread = () => import(/* webpackChunkName: "min" */ '@/components/unread/unread')
const Releas = () => import(/* webpackChunkName: "min" */ '@/components/releas/releas')
const Login = () => import(/* webpackChunkName: "login" */ '@/components/login/login')
const User = () => import(/* webpackChunkName: "login" */ '@/components/user/user')
const Topic = () => import(/* webpackChunkName: "login" */ '@/components/topic/topic')
const Message = () => import(/* webpackChunkName: "login" */ '@/components/message/message')
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/all'
        }, {
            path: '/all',
            component: All,
            children: [
                { path: '/all/:ItemId', component: Details },
                { path: '/all/review/:ItemId', component: Review }
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/user',
            component: User,
            children: [
                { path: '/user/topic/:topicType', component: Topic }
            ]
        },
        {
            path: '/message',
            component: Message
        },
        {
            path: '/Unread',
            component: Unread
        },
        {
            path: '/releas',
            component: Releas
        }
    ]

})