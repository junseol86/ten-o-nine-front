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
      path: '/:user_token/story_list',
      name: 'StoryList',
      component: StoryList
    },
    {
      path: '/:user_token/shop_list',
      name: 'ShopList',
      component: ShopList
    },
    {
      path: '/:user_token/shop_detail/:shop_id',
      name: 'ShopDetail',
      component: ShopDetail
    },
    {
      path: '/:user_token/menu_detail/:menu_id',
      name: 'ShopManuDetail',
      component: ShopMenuDetail
    },
    {
      path: '/:user_token/menu_pay',
      name: 'ShopManuPay',
      component: ShopMenuPay
    }
  ]
})
