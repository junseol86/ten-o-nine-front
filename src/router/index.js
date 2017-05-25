import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/1_intro/Intro'
import StoryList from '@/components/2_story/StoryList'
import ShopList from '@/components/3_shop/ShopList'
import ShopDetail from '@/components/3_shop/ShopDetail'
import ShopMenuDetail from '@/components/3_shop/ShopMenuDetail'
import ShopMenuPay from '@/components/3_shop/ShopMenuPay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/story_list',
      name: 'StoryList',
      component: StoryList
    },
    {
      path: '/shop_list/:type',
      name: 'ShopList',
      component: ShopList
    },
    {
      path: '/shop_detail/:shop_type/:shop_id',
      name: 'ShopDetail',
      component: ShopDetail
    },
    {
      path: '/menu_detail/:shop_name/:shop_type/:menu_id',
      name: 'ShopManuDetail',
      component: ShopMenuDetail
    },
    {
      path: '/menu_pay/:shop_name/:menu_name',
      name: 'ShopManuPay',
      component: ShopMenuPay
    }
  ]
})
