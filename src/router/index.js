import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'
import AuthGuard from './auth-guard'



Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '', // localhost:8080
        name: 'Home',
        component: Home
      },
      {
        path: '/ad/:id', // localhost:8080
        props:true,
        name: 'Ad',
        component: Ad
      },
    {
        path: '/list', // localhost:8080
        name: 'AdList',
        component: AdList,
        beforeEnter: AuthGuard
      },
    {
        path: '/new', // localhost:8080
        name: 'NewAd',
        component: NewAd,
        beforeEnter: AuthGuard
      },
    {
        path: '/login', // localhost:8080
        name: 'Login',
        component: Login
      },
    {
        path: '/registration', // localhost:8080
        name: 'Registration',
        component: Registration
      },
    {
        path: '/orders', // localhost:8080
        name: 'Orders',
        component: Orders,
        beforeEnter: AuthGuard
      },
  ],
  mode: 'history'
})
