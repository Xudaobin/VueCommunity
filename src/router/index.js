import Vue from 'vue'
import Router from 'vue-router'

const All = (resolve) => {
    import ('../components/all/all').then((module) => {
        resolve(module)
    })
}
const Details = (resolve) => {
    import ('../components/details/details').then((module) => {
        resolve(module)
    })
}
const Review = (resolve) => {
    import ('../components/review/review').then((module) => {
        resolve(module)
    })
}
const Login = (resolve) => {
    import ('../components/login/login').then((module) => {
        resolve(module)
    })
}
const User = (resolve) => {
    import ('../components/user/user').then((module) => {
        resolve(module)
    })
}
const Topic = (resolve) => {
    import ('../components/topic/topic').then((module) => {
        resolve(module)
    })
}
const Message = (resolve) => {
    import ('../components/message/message').then((module) => {
        resolve(module)
    })
}
const Unread = (resolve) => {
    import ('../components/unread/unread').then((module) => {
        resolve(module)
    })
}
const Releas = (resolve) => {
    import ('../components/releas/releas').then((module) => {
        resolve(module)
    })
}
Vue.use(Router)

export default new Router({
    mode: 'history',
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